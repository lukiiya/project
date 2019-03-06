<?php
namespace module;
//纵贯出票
class ZongGuan {
	private $common;
	private $commonService;
	private $orderService;
	private $ticketService;
	private $lotteryService;
	public $supplierId;
	public $supplierName;
	private $cgi;
	private $partnerid;
	private $key;
	public $lotteryMap;
	private $weekMap;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->commonService = requireService("Common");
		$this->orderService = requireService("Order");
		$this->ticketService = requireService("Ticket");
		$this->lotteryService = requireService("Lottery");
		$this->supplierId = 1;
		$this->supplierName = '纵贯出票';
		global $curEnv;
		if ($curEnv == 'dist') {
			$this->cgi = 'http://120.76.40.105:701/ticketinterface.aspx';
			$this->partnerid = '10011';
			$this->key = '367HJE62FHDFI521';
		} else {
			$this->cgi = 'http://120.76.40.105:550/ticketinterface.aspx';
			$this->partnerid = '10009';
			$this->key = '1234567';
		}
		//1=足球, 2=篮球
		$this->lotteryMap = array(
			'1' => array(
				'SPF' => array(
					'ticketLotteryId' => 'JCBRQSPF',
					'ticketBettype' => 'BRQSPF',
					'lotteryId' => 'JZSPF',
					'lotteryName' => '竞足胜平负',
					'value' => array(
						"S" => "胜",
						"P" => "平",
						"F" => "负",
						"胜" => "S",
						"平" => "P",
						"负" => "F"
					)
				),
				'RQSPF' => array(
					'ticketLotteryId' => 'JCSPF',
					'ticketBettype' => 'SPF',
					'lotteryId' => 'JZRQSPF',
					'lotteryName' => '竞足让球胜平负',
					'value' => array(
						"S" => "胜",
						"P" => "平",
						"F" => "负",
						"胜" => "S",
						"平" => "P",
						"负" => "F"
					)
				),
				'BF' => array(
					'ticketLotteryId' => 'JCBF',
					'ticketBettype' => 'BF',
					'lotteryId' => 'JZBF',
					'lotteryName' => '竞足比分',
					'value' => array(
						"1:0" => "1:0",
						"2:0" => "2:0",
						"2:1" => "2:1",
						"3:0" => "3:0",
						"3:1" => "3:1",
						"3:2" => "3:2",
						"4:0" => "4:0",
						"4:1" => "4:1",
						"4:2" => "4:2",
						"5:0" => "5:0",
						"5:1" => "5:1",
						"5:2" => "5:2",
						"SQT" => "胜其他",
						"胜其他" => "SQT",
						"0:0" => "0:0",
						"1:1" => "1:1",
						"2:2" => "2:2",
						"3:3" => "3:3",
						"PQT" => "平其他",
						"平其他" => "PQT",
						"0:1" => "0:1",
						"0:2" => "0:2",
						"1:2" => "1:2",
						"0:3" => "0:3",
						"1:3" => "1:3",
						"2:3" => "2:3",
						"0:4" => "0:4",
						"1:4" => "1:4",
						"2:4" => "2:4",
						"0:5" => "0:5",
						"1:5" => "1:5",
						"2:5" => "2:5",
						"FQT" => "负其他",
						"负其他" => "FQT"
					)
				),
				'ZJQ' => array(
					'ticketLotteryId' => 'JCJQS',
					'ticketBettype' => 'JQS',
					'lotteryId' => 'JZZJQ',
					'lotteryName' => '竞足总进球',
					'value' => array(
						"0" => "0",
						"1" => "1",
						"2" => "2",
						"3" => "3",
						"4" => "4",
						"5" => "5",
						"6" => "6",
						"7+" => "7+"
					)
				),
				'BQC' => array(
					'ticketLotteryId' => 'JCBQC',
					'ticketBettype' => 'BQC',
					'lotteryId' => 'JZBQC',
					'lotteryName' => '竞足半全场',
					'value' => array(
						"SS" => "胜-胜",
						"SP" => "胜-平",
						"SF" => "胜-负",
						"PS" => "平-胜",
						"PP" => "平-平",
						"PF" => "平-负",
						"FS" => "负-胜",
						"FP" => "负-平",
						"FF" => "负-负",
						"胜胜" => "SS",
						"胜平" => "SP",
						"胜负" => "SF",
						"平胜" => "PS",
						"平平" => "PP",
						"平负" => "PF",
						"负胜" => "FS",
						"负平" => "FP",
						"负负" => "FF"
					)
				),
				'HHGG' => array(
					'ticketLotteryId' => 'JCZQFH',
					'lotteryId' => 'JZHHGG',
					'lotteryName' => '竞足混合过关'
				)
			),
			'2' => array(
				'SF' => array(
					'ticketLotteryId' => 'JCSF',
					'ticketBettype' => 'SF',
					'lotteryId' => 'JLSF',
					'lotteryName' => '竞篮胜负',
					'value' => array(
						"S" => "主胜",
						"F" => "客胜",
						"主胜" => "S",
						"客胜" => "F"
					)
				),
				'RFSF' => array(
					'ticketLotteryId' => 'JCRFSF',
					'ticketBettype' => 'RFSF',
					'lotteryId' => 'JLRFSF',
					'lotteryName' => '竞篮让分胜负',
					'value' => array(
						"S" => "主胜",
						"F" => "客胜",
						"主胜" => "S",
						"客胜" => "F"
					)
				),
				'SFC' => array(
					'ticketLotteryId' => 'JCFC',
					'ticketBettype' => 'FC',
					'lotteryId' => 'JLSFC',
					'lotteryName' => '竞篮胜分差',
					'value' => array(
						"S1-5" => "胜1-5",
						"S6-10" => "胜6-10",
						"S11-15" => "胜11-15",
						"S16-20" => "胜16-20",
						"S21-25" => "胜21-25",
						"S26+" => "胜26+",
						"F1-5" => "负1-5",
						"F6-10" => "负6-10",
						"F11-15" => "负11-15",
						"F16-20" => "负16-20",
						"F21-25" => "负21-25",
						"F26+" => "负26+",
						"胜1-5分" => "S1-5",
						"胜6-10分" => "S6-10",
						"胜11-15分" => "S11-15",
						"胜16-20分" => "S16-20",
						"胜21-25分" => "S21-25",
						"胜26分以上" => "S26+",
						"负1-5分" => "F1-5",
						"负6-10分" => "F6-10",
						"负11-15分" => "F11-15",
						"负16-20分" => "F16-20",
						"负21-25分" => "F21-25",
						"负26分以上" => "F26+"
					)
				),
				'DXF' => array(
					'ticketLotteryId' => 'JCDXF',
					'ticketBettype' => 'DXF',
					'lotteryId' => 'JLDXF',
					'lotteryName' => '竞篮大小分',
					'value' => array(
						"D" => "大",
						"X" => "小",
						"大" => "D",
						"小" => "X"
					)
				),
				'HHGG' => array(
					'ticketLotteryId' => 'JCLQFH',
					'lotteryId' => 'JLHHGG',
					'lotteryName' => '竞篮混合过关'
				)
			),
			'SSQ' => array(
				'ticketLotteryId' => 'SSQ',
				'lotteryId' => 'SSQ',
				'lotteryName' => '双色球',
				'beginTimeOffset' => 11 * 60,//纵贯晚官方10分钟开始收票(20:10),我们再晚1分钟找纵贯出票
				'endTimeOffset' => 50 * 60//纵贯早官方30分钟截止收票(19:30),我们也是早30分钟截止去纵贯出票->改成19:05分截至
			),
            'JSK3' => array(
                'ticketLotteryId' => 'JSK3',
                'lotteryId' => 'JSK3',
                'lotteryName' => '江苏快3',
                'beginTimeOffset' => 1 * 60,//纵贯和官方时间一致开始收票,我们再晚1分钟找纵贯出票
                'endTimeOffset' => 1.5 * 60//纵贯早官方1.5分钟截止收票,我们也是早1.5分钟截止去纵贯出票
            ),
			'DLT' => array(
				'ticketLotteryId' => 'DLT',
				'lotteryId' => 'DLT',
				'lotteryName' => '大乐透',
				'beginTimeOffset' => 31 * 60,//纵贯晚官方30分钟开始收票(20:30),我们再晚1分钟找纵贯出票
				'endTimeOffset' => 30 * 60//纵贯早官方30分钟截止收票(19:30),我们也是早30分钟截止去纵贯出票
			),
            'GX11X5' => array(
                'ticketLotteryId' => 'GX11X5',
                'lotteryId' => 'GX11X5',
                'lotteryName' => '广西11选5',
                'beginTimeOffset' => 1 * 60,//纵贯和官方时间一致开始收票,我们再晚1分钟找纵贯出票
                'endTimeOffset' => 1.5 * 60//纵贯早官方1.5分钟截止收票,我们也是早1.5分钟截止去纵贯出票
            ),
			'FC3D' => array(
				'ticketLotteryId' => '3D',
				'lotteryId' => 'FC3D',
				'lotteryName' => '福彩3D',
				'beginTimeOffset' => 31 * 60,//纵贯晚官方30分钟开始收票(20:30),我们再晚1分钟找纵贯出票
				'endTimeOffset' => 50 * 60//纵贯早官方30分钟截止收票(19:30),我们也是早30分钟截止去纵贯出票->改成19:05分截至
			),
            'SJBGJ' => array(
                'ticketLotteryId' => 'jcsjbgj',
                'lotteryId' => 'SJBGJ',
                'lotteryName' => '世界杯冠军'
            ),
            'SJBGYJ' => array(
                'ticketLotteryId' => 'jcyj',
                'lotteryId' => 'SJBGYJ',
                'lotteryName' => '世界杯冠亚军'
            )
		);
		$this->weekMap = array(
			'周一' => '1',
			'周二' => '2',
			'周三' => '3',
			'周四' => '4',
			'周五' => '5',
			'周六' => '6',
			'周日' => '7',
			'1' => '周一',
			'2' => '周二',
			'3' => '周三',
			'4' => '周四',
			'5' => '周五',
			'6' => '周六',
			'7' => '周日'
		);
	}

	private function httpPost($url, $data) {
		$header[] = "Content-type: text/xml";
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);//返回原生的（Raw）输出
		curl_setopt($ch, CURLOPT_TIMEOUT, 10);//10秒超时
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
		$res = curl_exec($ch);
		curl_close($ch);
		return $res;
	}

	private function request($transcode, $body) {
		$resp = requireModule('Resp');
		if (empty($transcode)) {
			$resp->msg = 'transcode参数有误';
			return $resp;
		}
		if (empty($body)) {
			$resp->msg = 'body参数有误';
			return $resp;
		}
		$time = date("YmdHis");
		$msg = '<?xml version="1.0" encoding="UTF-8"?><msg><head transcode="'.$transcode.'" partnerid="'.$this->partnerid.'" version="1.0" time="'.$time.'"/><body>'.$body.'</body></msg>';
		$key = md5($transcode.$msg.$this->key);
		$data = 'transcode='.$transcode.'&msg='.$msg.'&key='.$key.'&partnerid='.$this->partnerid;
		$httpPostResp = trim($this->httpPost($this->cgi, $data));
		$arr = explode('&', $httpPostResp);
		$respArr = array();
		foreach ($arr as $item) {
			$index = strpos($item, '=');
			if ($index === false) {
				continue;
			}
			$key = substr($item, 0, $index);
			$value = substr($item, $index + 1);
			$respArr[$key] = $value;
		}
		if (!is_array($respArr) || count($respArr) != 4) {
			$resp->msg = '请求响应有误';
			return $resp;
		}
		$respTranscode = trim($respArr['transcode']);
		$respMsg = trim($respArr['msg']);
		$respKey = trim($respArr['key']);
		$respPartnerid = trim($respArr['partnerid']);
		$checkKey = strtoupper(md5($respTranscode.$respMsg.$this->key));
		if ($respPartnerid != $this->partnerid || $checkKey != $respKey) {
			$resp->msg = '响应验签失败';
			return $resp;
		}
		//$this->common->logger->info('请求：'.$data."\n响应：".$httpPostResp."\n");
		$xml = simplexml_load_string($respMsg);
		if (empty($xml)) {
			$resp->msg = '响应msg不是正确的xml';
			return $resp;
		}
		$resp->data = $xml;
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	public function verifyNotify() {
		$resp = requireModule('Resp');
		$data = file_get_contents("php://input");
		if (empty($data)) {
			$resp->msg = '通知数据有误';
			return $resp;
		}
		$arr = explode('&', $data);
		$respArr = array();
		foreach ($arr as $item) {
			$index = strpos($item, '=');
			if ($index === false) {
				continue;
			}
			$key = substr($item, 0, $index);
			$value = substr($item, $index + 1);
			$respArr[$key] = $value;
		}
		if (!is_array($respArr) || count($respArr) != 4) {
			$resp->msg = '请求响应有误';
			return $resp;
		}
		$respTranscode = trim($respArr['transcode']);
		$respMsg = trim($respArr['msg']);
		$respKey = trim($respArr['key']);
		$respPartnerid = trim($respArr['partnerid']);
		$checkKey = strtoupper(md5($respTranscode.$respMsg.$this->key));
		if ($respPartnerid != $this->partnerid || $checkKey != $respKey) {
			$resp->msg = '通知验签失败';
			return $resp;
		}
		$this->common->logger->info('通知数据：'.$data);
		$xml = simplexml_load_string($respMsg);
		if (empty($xml)) {
			$resp->msg = '响应msg不是正确的xml';
			return $resp;
		}
		$resp->data = $xml;
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	public function notifyReturn($transcode, $body) {
		$resp = requireModule('Resp');
		if (empty($transcode)) {
			$resp->msg = 'transcode参数有误';
			return $resp;
		}
		if (empty($body)) {
			$resp->msg = 'body参数有误';
			return $resp;
		}
		$time = date("YmdHis");
		$msg = '<?xml version="1.0" encoding="UTF-8"?><msg><head transcode="'.$transcode.'" partnerid="'.$this->partnerid.'" version="1.0" time="'.$time.'"/><body>'.$body.'</body></msg>';
		$key = md5($transcode.$msg.$this->key);
		$data = 'transcode='.$transcode.'&msg='.$msg.'&key='.$key.'&partnerid='.$this->partnerid;
		$resp->data = $data;
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	//出票
	public function ticketDeal() {
		$resp = requireModule('Resp');
		$param = array();
		$param['ticketSupplierId'] = $this->supplierId;//出票供应商
		$param['orderType'] = 3;//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=出票订单
		$param['status'] = 2; //订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
		$param['ticketStatus'] = 0;//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
		$param['pageNum'] = 1;
		$param['pageSize'] = 200;
		$selectOrderResp = $this->orderService->selectOrder($param);
		if ($selectOrderResp->errCode != 0) {
			$resp->msg = '订单查询异常';
			return $resp;
		}
		$orderList = $selectOrderResp->data['list'];
		if (!is_array($orderList) || count($orderList) <= 0) {
			$resp->msg = '不存在需要出的票';
			return $resp;
		}
		$orderList = $this->commonService->setMatchList($orderList, 'planMatchRecommend');
		for ($i = 0, $length = count($orderList); $i < $length; $i++) {
			$order = $orderList[$i];
			$orderId = (int)$order['orderId'];
			$orderType = (int)$order['orderType'];
			$status = (int)$order['status'];
			$ticketStatus = (int)$order['ticketStatus'];
			$ticketMultiple = (int)$order['ticketMultiple'];
			$amount = (int)$order['amount'];
			if ($orderId <= 0 || $orderType != 3 || $status != 2 || $ticketStatus != 0 || $ticketMultiple <= 0 || $amount <= 0) {
				continue;
			}
			$this->requestTicket($order);
		}
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	public function orderTicketDeal($orderIdArr) {
		$resp = requireModule('Resp');
		if (count($orderIdArr) <= 0) {
			$resp->msg = 'orderIdArr参数有误';
			return $resp;
		}
		$param = array();
		$param['ticketSupplierId'] = $this->supplierId;//出票供应商
		$param['orderId'] = $orderIdArr;
		$param['orderType'] = 3;//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=出票订单
		$param['status'] = 2; //订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
		$param['ticketStatus'] = 0;//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
		$param['pageNum'] = 1;
		$param['pageSize'] = 60;
		$selectOrderResp = $this->orderService->selectOrder($param);
		if ($selectOrderResp->errCode != 0) {
			$resp->msg = '订单查询异常';
			return $resp;
		}
		$orderList = $selectOrderResp->data['list'];
		if (!is_array($orderList) || count($orderList) <= 0) {
			$resp->msg = '不存在需要出的票';
			return $resp;
		}
		$orderList = $this->commonService->setMatchList($orderList, 'planMatchRecommend');
		for ($i = 0, $length = count($orderList); $i < $length; $i++) {
			$order = $orderList[$i];
			$orderId = (int)$order['orderId'];
			$orderType = (int)$order['orderType'];
			$status = (int)$order['status'];
			$ticketStatus = (int)$order['ticketStatus'];
			$ticketMultiple = (int)$order['ticketMultiple'];
			$amount = (int)$order['amount'];
			if ($orderId <= 0 || $orderType != 3 || $status != 2 || $ticketStatus != 0 || $ticketMultiple <= 0 || $amount <= 0) {
				continue;
			}
			$this->requestTicket($order);
		}
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	public function formatMatchList($matchList) {
		$resp = requireModule('Resp');
		if (!is_array($matchList) || count($matchList) <= 0) {
			$resp->msg = '参数异常';
			return $resp;
		}
		$matchType = array();
		foreach ($matchList as $match) {
			$type = (int)$match['type'];
			if ($type > 0) {
				$matchType[] = $type;
			}
		}
		$matchType = array_unique($matchType);
		if (count($matchType) != 1) {
			$resp->msg = '比赛类型异常';
			return $resp;
		}
		$matchType = $matchType[0];
		$ticketLotteryId = null;
		$lotteryId = null;
		$lotteryName = null;
		$betUnits = 1;
		$betContent = null;
		$bettypeContentArr = array();
		foreach ($matchList as $match) {
			$bettypeContentArr[] = trim($match['bettypeContent']);
		}
		$bettypeContentArr = array_unique($bettypeContentArr);
		$bettypeLength = count($bettypeContentArr);
		if ($bettypeLength <= 0) {
			$resp->msg = '订单比赛玩法类型异常';
			return $resp;
		}
		if ($bettypeLength == 1) {//普通过关
			$ticketLotteryId = $this->lotteryMap[$matchType][$bettypeContentArr[0]]['ticketLotteryId'];
			$lotteryId = $this->lotteryMap[$matchType][$bettypeContentArr[0]]['lotteryId'];
			$lotteryName = $this->lotteryMap[$matchType][$bettypeContentArr[0]]['lotteryName'];
		} else {//混合过关
			$ticketLotteryId = $this->lotteryMap[$matchType]['HHGG']['ticketLotteryId'];
			$lotteryId = $this->lotteryMap[$matchType]['HHGG']['lotteryId'];
			$lotteryName = $this->lotteryMap[$matchType]['HHGG']['lotteryName'];
		}
		$betContent = array();
		foreach ($matchList as $match) {
			$number = trim($match['number']);
			preg_match('/^(\D+)(\d+)$/', $number, $matches);
			$week = trim($this->weekMap[trim($matches[1])]);
			$num =  trim($matches[2]);
			if (!is_array($matches) || count($matches) != 3 || empty($week) || empty($num)) {
				$resp->msg = '比赛编号有误';
				return $resp;
			}
			$bettypeContent = trim($match['bettypeContent']);
			$recommend = $match['recommend'];
			$betUnits *= count($recommend);
			$rd = array();
			foreach ($recommend as $r) {
				$rd[] = trim($this->lotteryMap[$matchType][$bettypeContent]['value'][$r]);
			}
			if ($bettypeLength == 1) {//普通过关
				$betContent[] = $week.'-'.$num.':['.implode(',', $rd).']';
			} else {//混合过关
				$betContent[] = $this->lotteryMap[$matchType][$bettypeContent]['ticketBettype'].'@'.$week.'-'.$num.':['.implode(',', $rd).']';
			}
		}
		$betContent = implode('/', $betContent);
		if (empty($ticketLotteryId) || empty($lotteryId) || empty($lotteryName) || $betUnits <= 0 || empty($betContent)) {
			$resp->msg = '出票格式转换有误';
			return $resp;
		}
		$resp->data = array(
			'ticketLotteryId' => $ticketLotteryId,
			'lotteryId' => $lotteryId,
			'lotteryName' => $lotteryName,
			'betUnits' => $betUnits,
			'betContent' => $betContent
		);
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	private function requestTicket($order) {
		$resp = requireModule('Resp');
		if (empty($order)) {
			$resp->msg = 'order参数有误';
			return $resp;
		}
		$orderId = (int)$order['orderId'];
		$userId = (int)$order['userId'];
		$nickName = trim($order['nickName']);
		$realName = trim($order['realName']);
		$orderType = (int)$order['orderType'];
		$status = (int)$order['status'];
		$ticketStatus = (int)$order['ticketStatus'];
		$ticketUnit = (int)$order['ticketUnit'];
		$ticketMultiple = (int)$order['ticketMultiple'];
		$amount = (int)$order['amount'];
		$planMatchType = (int)$order['planMatchType'];
		$planMatchRecommend = trim($order['planMatchRecommend']);
		$ticketPassType = trim($order['ticketPassType']);
		$orderMatchList = $order['matchList'];
		if ($orderId <= 0 || $userId <= 0 || $orderType != 3 || $status != 2 || $ticketStatus != 0 || $ticketUnit <= 0 || $ticketMultiple <= 0 || $ticketMultiple > 100000 || $amount <= 0 || $planMatchType <= 0 || empty($planMatchRecommend) || empty($ticketPassType) || !is_array($orderMatchList) || count($orderMatchList) <= 0) {
			$resp->msg = '订单数据异常';
			return $resp;
		}
		//下单接口一次最大只能出50张票；一张订单可以多张票,因为单票最大99倍。
		$ticketsnum = ceil($ticketMultiple/99);//单张票最大99倍
		if ($ticketsnum <= 0) {
			$this->common->logger->info('订单票数('.$ticketsnum.')异常');
			$resp->msg = '订单票数异常';
			return $resp;
		}
		$matchMap = array();
		foreach ($orderMatchList as $match) {
			$matchId = (int)$match['matchId'];
			$oddsId = (int)$match['oddsId'];
			if ($matchId <= 0 || $oddsId <= 0) {
				$resp->msg = '过关赛事异常';
				return $resp;
			}
			$matchMap[$matchId.'-'.$oddsId] = $match;
		}
		$calculateTicketResp = $this->commonService->calculateTicket($planMatchRecommend, $ticketPassType);
		if ($calculateTicketResp->errCode != 0) {
			$resp->msg = $calculateTicketResp->msg;
			return $resp;
		}
		$ticketPassTypeMap = $calculateTicketResp->data;
		$countAmount = 0;
		$countTicketUnit = 0;
		$issue = date("Ymd");
		$insertDataArr = array();
		$sqlArr = array();
		$database = requireModule("Database");
		foreach ($ticketPassTypeMap as $item) {
			$unit = (int)$item['ticketUnit'];
			$mrArr = $item['matchRecommend'];
			if ($unit <= 0 || !is_array($mrArr) || count($mrArr) <= 0) {
				$database->close();
				$resp->msg = '过关赛事异常';
				return $resp;
			}
			$countTicketUnit += $unit;
			foreach ($mrArr as $mr) {
				$mrJson = json_decode($mr);
				if (empty($mrJson)) {
					$database->close();
					$resp->msg = '过关赛事异常';
					return $resp;
				}
				$matchList = array();
				foreach ($mrJson as $r) {
					$matchId = (int)$r->matchId;
					$oddsId = (int)$r->oddsId;
					$match = $matchMap[$matchId.'-'.$oddsId];
					if ($matchId <= 0 || $oddsId <= 0 || empty($match)) {
						$database->close();
						$resp->msg = '过关赛事异常';
						return $resp;
					}
					$matchList[] = $match;
				}
				//出票格式转换
				$formatMatchListResp = $this->formatMatchList($matchList);
				if ($formatMatchListResp->errCode != 0) {
					$database->close();
					$resp->msg = $formatMatchListResp->msg;
					return $resp;
				}
				$formatMatchListData = $formatMatchListResp->data;
				$ticketLotteryId = trim($formatMatchListData['ticketLotteryId']);
				$lotteryId = trim($formatMatchListData['lotteryId']);
				$lotteryName = trim($formatMatchListData['lotteryName']);
				$betUnits = (int)$formatMatchListData['betUnits'];
				$betContent = trim($formatMatchListData['betContent']);
				$matchLength = count($matchList);
				$passType = $matchLength.'x1';
				for ($i = 0; $i < $ticketsnum; $i++) {
					$multiple = 0;
					if ($ticketsnum == 1) {
						$multiple = $ticketMultiple;
					} else if (($i == $ticketsnum - 1) && ($ticketMultiple % 99) != 0) {
						$multiple = (int)($ticketMultiple % 99);
					} else {
						$multiple = 99;
					}
					$betMoney = (int)($multiple*$betUnits*2);
					if ($multiple <= 0 || $betMoney <= 0) {
						$database->close();
						$resp->msg = '出票金额,倍数有误';
						return $resp;
					}
					$countAmount += $betMoney * 100;
					$field = array();
					$field[] = 'orderId="' . $database->escape($orderId) . '"';
					$field[] = 'userId="' . $database->escape($userId) . '"';
					$field[] = 'nickName="' . $database->escape($nickName) . '"';
					$field[] = 'realName="' . $database->escape($realName) . '"';
					$field[] = 'supplierId="' . $database->escape($this->supplierId) . '"';
					$field[] = 'supplierName="' . $database->escape($this->supplierName) . '"';
					$field[] = 'lotteryId="' . $database->escape($lotteryId) . '"';
					$field[] = 'lotteryName="' . $database->escape($lotteryName) . '"';
					$field[] = 'unit="' . $database->escape($betUnits) . '"';
					$field[] = 'multiple="' . $database->escape($multiple) . '"';
					$field[] = 'amount="' . $database->escape($betMoney*100) . '"';
					$field[] = 'issue="' . $database->escape($issue) . '"';
					$field[] = 'passType="' . $database->escape($passType) . '"';
					$field[] = 'betContent="' . $database->escape($betContent) . '"';
					$field[] = 'matchRecommend="' . $database->escape($mr) . '"';
					$field[] = 'createTime=now()';
					$sqlArr[] = 'insert into t_ticket set ' . implode(',', $field);
					$insertDataArr[] = array('ticketLotteryId' => $ticketLotteryId, 'matchLength' => $matchLength, 'betUnits' => $betUnits, 'multiple' => $multiple, 'betMoney' => $betMoney, 'betContent' => $betContent);
				}
			}
		}
		if ($ticketUnit != $countTicketUnit) {
			$database->close();
			$resp->msg = '订单注数和赛事注数不符';
			return $resp;
		}
		if ($countAmount != $amount) {
			$database->close();
			$resp->msg = '出票总额和订单金额不符';
			return $resp;
		}
		if (count($sqlArr) <= 0) {
			$database->close();
			$resp->msg = '插入票sql为空';
			return $resp;
		}
		if ($database->execute('start transaction')) {
			$sql = implode(';', $sqlArr);
			$result = $database->multiExecute($sql);
			if (!$result) {
				$database->execute('rollback');
				$database->close();
				$resp->msg = '出票状态sql执行异常';
				return $resp;
			}
			$ticketIdArr = $database->multiInsertId();
			if (count($insertDataArr) != count($ticketIdArr)) {
				$database->execute('rollback');
				$database->close();
				$resp->msg = '出票插入执行异常';
				return $resp;
			}
			$insertDataMap = array();
			for ($i = 0, $length = count($ticketIdArr); $i < $length; $i++) {
				$ticketId = (int)$ticketIdArr[$i];
				if ($ticketId <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '出票id生成异常';
					return $resp;
				}
				$insertDataArr[$i]['ticketId'] = $ticketId;
				$ticketLotteryId = trim($insertDataArr[$i]['ticketLotteryId']);
				$matchLength = (int)$insertDataArr[$i]['matchLength'];
				$betUnits = (int)$insertDataArr[$i]['betUnits'];
				$multiple = (int)$insertDataArr[$i]['multiple'];
				$betMoney = (int)$insertDataArr[$i]['betMoney'];
				$betContent = trim($insertDataArr[$i]['betContent']);
				if (!empty($ticketLotteryId) && $matchLength > 0 && $betUnits > 0 && $multiple > 0 && $betMoney > 0 && !empty($betContent)) {
					if (!key_exists($ticketLotteryId, $insertDataMap)) {
						$insertDataMap[$ticketLotteryId] = array();
					}
					$insertDataMap[$ticketLotteryId][] = $insertDataArr[$i];
				}
			}
			$ticketNum = 0;
			$bodyArr = array();
			foreach ($insertDataMap as $ticketLotteryId => $dataArr) {
				$countNum = 0;
				$countMoney = 0;
				$countTicket = array();
				for ($i = 0, $length = count($dataArr); $i < $length; $i++) {
					$ticketId = (int)$dataArr[$i]['ticketId'];
					$matchLength = (int)$dataArr[$i]['matchLength'];
					$betUnits = (int)$dataArr[$i]['betUnits'];
					$multiple = (int)$dataArr[$i]['multiple'];
					$betMoney = (int)$dataArr[$i]['betMoney'];
					$betContent = trim($dataArr[$i]['betContent']);
					$countNum++;
					$countMoney += $betMoney;
					$countTicket[] = '<ticket ticketId="'.$ticketId.'" betType="P'.$matchLength.'_1" issueNumber="" betUnits="'.$betUnits.'" multiple="'.$multiple.'" betMoney="'.$betMoney.'" isAppend="0"><betContent>'.$betContent.'</betContent></ticket>';
					if ($i == ($length - 1) || $countNum == 50) {
						$ticketNum += $countNum;
						$body = array();
						$body[] = '<ticketorder lotteryId="'.$ticketLotteryId.'" ticketsnum="'.$countNum.'" totalmoney="'.$countMoney.'">';
						$body[] = '<tickets>'.implode('', $countTicket).'</tickets>';
						$body[] = '</ticketorder>';
						$bodyArr[] = implode('', $body);
						$countNum = 0;
						$countMoney = 0;
						$countTicket = array();
					}
				}
			}
			if (count($ticketIdArr) != $ticketNum) {
				$database->execute('rollback');
				$database->close();
				$resp->msg = '插入票和请求出票数量不符';
				return $resp;
			}
			//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
			//更新订单状态
			$updateOrderSql = 'update t_order set ticketStatus=7 where orderId="' . $orderId . '" and orderType=3 and status=2 and ticketStatus=0 limit 1 ';
			$updateOrderResult = $database->execute($updateOrderSql);
			$updateOrderAffectedRows = (int)$database->getAffectedRows();
			if (!$updateOrderResult || $updateOrderAffectedRows <= 0) {
				$database->execute('rollback');
				$database->close();
				$resp->msg = '更新订单出票状态失败';
				return $resp;
			}
			$database->execute('commit');
			$database->close();
			foreach ($bodyArr as $body) {
				$this->request('002', $body);
			}
			$resp->errCode = 0;
			$resp->msg = '成功';
			return $resp;
		} else {
			$resp->msg = '出票事物异常';
			return $resp;
		}
	}

	//查询票状态
	public function ticketStatus() {
		$resp = requireModule('Resp');
		$param = array();
		$param['supplierId'] = $this->supplierId;
		$param['status'] = 0;//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已撤单
		$param['needSport'] = true;
		$param['justCount'] = true;
		$selectTicketResp = $this->ticketService->selectTicket($param);
		if ($selectTicketResp->errCode != 0) {
			$resp->msg = '票查询异常';
			return $resp;
		}
		$data = $selectTicketResp->data;
		$totalCount = (int)$data['totalCount'];
		$pageSum = (int)ceil($totalCount/50);
		if ($totalCount <= 0 || $pageSum <= 0) {
			$resp->msg = '不存在需要设置状态的票';
			return $resp;
		}
		for ($i = 1; $i <= $pageSum; $i++) {
			$this->doTicketStatus($i);
		}
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	//查询票状态
	private function doTicketStatus($pageNum) {
		$resp = requireModule('Resp');
		$pageNum = (int)$pageNum;
		if ($pageNum <= 0) {
			$resp->msg = '票页码异常';
			return $resp;
		}
		$param = array();
		$param['supplierId'] = $this->supplierId;
		$param['status'] = 0;//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已撤单
		$param['needSport'] = true;
		$param['orderBy'] = 1;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = 50;//一次可以查询50张票,只能查询7天之内的数据
		$selectTicketResp = $this->ticketService->selectTicket($param);
		if ($selectTicketResp->errCode != 0) {
			$resp->msg = '票查询异常';
			return $resp;
		}
		$ticketList = $selectTicketResp->data['list'];
		$orderIdArr = array();
		$tickets = array();
		$ticketMap = array();
		foreach ($ticketList as $ticket) {
			$orderId = (int)$ticket['orderId'];
			$ticketId = (int)$ticket['ticketId'];
			$status = (int)$ticket['status'];
			if ($orderId <= 0 || $ticketId <= 0 || $status != 0) {
				continue;
			}
			$orderIdArr[] = $orderId;
			$tickets[] = '<queryticket ticketId="'.$ticketId.'" />';
			$ticketMap[$ticketId] = $ticket;
		}
		$orderIdArr = array_unique($orderIdArr);
		if (count($orderIdArr) <= 0 || count($tickets) <= 0 || count($ticketMap) <= 0) {
			$resp->msg = '不存在需要设置状态的票';
			return $resp;
		}
		$param = array();
		$param['orderId'] = $orderIdArr;
		$param['orderType'] = 3;//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=出票订单
		$param['status'] = 2; //订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
		$param['ticketSupplierId'] = $this->supplierId;//出票供应商
		$param['pageNum'] = 1;
		$param['pageSize'] = 50;
		$selectOrderResp = $this->orderService->selectOrder($param);
		if ($selectOrderResp->errCode != 0) {
			$resp->msg = '订单查询异常';
			return $resp;
		}
		$orderList = $selectOrderResp->data['list'];
		$orderList = $this->commonService->setMatchList($orderList, 'planMatchRecommend');
		$orderMap = array();
		foreach ($orderList as $order) {
			$orderId = (int)$order['orderId'];
			if ($orderId > 0) {
				$orderMap[$orderId] = $order;
			}
		}
		if (count($orderMap) <= 0) {
			$resp->msg = '票订单查询异常';
			return $resp;
		}
		$body = implode('', $tickets);
		$requestResp = $this->request('003', $body);
		if ($requestResp->errCode != 0 || empty($requestResp->data)) {
			$resp->msg = '出票请求有误';
			return $resp;
		}
		$xml = $requestResp->data;
		$orderSqlArr = array();
		$ticketSqlArr = array();
		$setOrderIdArr = array();
		$database = requireModule("Database");
		foreach ($xml->children() as $child1) {
			$nodeName1 = trim($child1->getName());
			if ($nodeName1 != 'body') {
				continue;
			}
			foreach ($child1->children() as $child2) {
				$nodeName2 = trim($child2->getName());
				if ($nodeName2 != 'ticketresult') {
					continue;
				}
				$issue = trim($child2['issueNumber']);
				$ticketId = (int)$child2['ticketId'];
				$platformId = trim($child2['palmId']);
				$statusCode = trim($child2['statusCode']);
				$printOdds = trim($child2['printodd']);
				$printNo = trim($child2['printNo']);
				$printTime = trim($child2['PrintOutTime']);
				$printConcede = trim($child2['rq']);
				$ticket = $ticketMap[$ticketId];
				$ticketCreateTime = strtotime(trim($ticket['createTime']));
				$matchRecommend = trim($ticket['matchRecommend']);
				$updateMatchRecommend = json_decode($matchRecommend, true);
				$orderId = (int)$ticket['orderId'];
				$order = $orderMap[$orderId];
				$planMatchType = (int)$order['planMatchType'];
				$planMatchRecommend = trim($order['planMatchRecommend']);
				$updatePlanMatchRecommend = json_decode($planMatchRecommend, true);
				$matchList = $order['matchList'];
				$matchMap = array();
				foreach ($matchList as $match) {
					$number = trim($match['number']);
					if (!empty($number)) {
						$matchMap[$number] = $match;
					}
				}
				//statusCode, 000=订单不存在, 001=等待交易, 002=交易中, 003=交易成功, 004=交易失败
				if ($ticketId <= 0 || empty($ticket) || empty($matchRecommend) || empty($updateMatchRecommend) || $orderId <= 0 || empty($order) || $planMatchType <= 0 || empty($planMatchRecommend) || empty($updatePlanMatchRecommend) || empty($matchList) || empty($matchMap) || ($statusCode != '000' && $statusCode != '003' && $statusCode != '004')) {
					continue;
				}
				$status = 0;//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已撤单
				if ($statusCode == '003') {
					$status = 2;
				} else if ($statusCode == '004') {
					$status = 1;
				} else if ($statusCode == '000' && (time()-$ticketCreateTime) > 60) {//防止出票商集群服务器不同步产生"不存在"异常
					$status = 1;
				}
				//添加更新票信息
				$ticketField = array();
				$ticketField[] = 'status="' . $database->escape($status) . '"';
				if (!empty($issue)) {
					$ticketField[] = 'issue="' . $database->escape($issue) . '"';
				}
				$ticketField[] = 'platformId="' . $database->escape($platformId) . '"';
				$ticketField[] = 'printOdds="' . $database->escape($printOdds) . '"';
				$ticketField[] = 'printConcede="' . $database->escape($printConcede) . '"';
				$ticketField[] = 'printNo="' . $database->escape($printNo) . '"';
				$ticketField[] = 'printTime="' . $database->escape($printTime) . '"';
				$setOrderIdArr[] = $orderId;
				if (!empty($printOdds)) {
					//$printOdds普通过关：7-001:[胜=1.250]/7-002:[胜=1.500]
					//$printOdds混合过关：SPF@7-003:[平=3.600,负=1.780]/JQS@7-004:[1=4.700]/BQC@7-005:[胜胜=2.500,平平=5.000]/BF@7-006:[1:1=5.600,2:2=14.00,3:3=70.00]
					$oddsMap = array();
					$matchApp = explode('/', $printOdds);
					foreach ($matchApp as $m) {
						$m = trim($m);
						$mhIndex = strpos($m, ':');
						if ($mhIndex === false) {
							//票信息异常，没必要进行以下的比赛，跳回 $child1->children() as $child2 循环
							continue 2;
						}
						$app = array(substr($m, 0, $mhIndex), substr($m, $mhIndex + 1));
						$number = null;
						$bettypeIndex = strpos($app[0], '@');
						if ($bettypeIndex !== false) {
							$number = substr($app[0], $bettypeIndex + 1);
						} else {
							$number = $app[0];
						}
						$numberApp = explode('-', $number);
						if (!is_array($numberApp) || count($numberApp) != 2) {
							//票信息异常，没必要进行以下的比赛，跳回 $child1->children() as $child2 循环
							continue 2;
						}
						$week = $this->weekMap[(int)$numberApp[0]];
						$match = $matchMap[$week.trim($numberApp[1])];
						$oddsId = (int)$match['oddsId'];
						$bettypeContent = trim($match['bettypeContent']);
						$bettypeOdds = $match['bettypeOdds'];
						if (empty($week) || empty($match) || $oddsId <= 0 || empty($bettypeContent) || empty($bettypeOdds)) {
							//票信息异常，没必要进行以下的比赛，跳回 $child1->children() as $child2 循环
							continue 2;
						}
						$concede = 0;
						//只有足球的'让球胜平负'$printConcede才有值
						if (!empty($printConcede)) {
							//$printConcede类似：7-019=-1;7-020=-2;7-021=+1
							$pattern = '/'.$number.'=([^;]*)/';
							$temp = null;
							preg_match($pattern, $printConcede, $temp);
							if (is_array($temp) && count($temp) == 2) {
								$concede = $temp[1]+0;//转换成数字
							}
						}
						//玩法选项,类似：[平=3.600,负=1.780] 或 [主胜=1.820^+7.5](只有篮球的'让分胜负'和'大小球'才有这种写法)
						$itemList = explode(',', preg_replace('/[\[\]]/', '', trim($app[1])));
						foreach ($itemList as $item) {
							$itemApp = explode('=', trim($item));
							if (!is_array($itemApp) || count($itemApp) != 2) {
								//票信息异常，没必要进行以下的比赛，跳回 $child1->children() as $child2 循环
								continue 3;
							}
							$value = trim($itemApp[0]);
							$odds = trim($itemApp[1]);
							$concedeApp = explode('^', $odds);
							if (is_array($concedeApp) && count($concedeApp) == 2) {
								$odds = trim($concedeApp[0]);
								$concede = trim($concedeApp[1]);
							}
							$valueMap = $this->lotteryMap[$planMatchType][$bettypeContent]['value'];
							$localValue = $valueMap[$value];
							if (empty($odds) || !key_exists($value, $valueMap)) {
								//票信息异常，没必要进行以下的比赛，跳回 $child1->children() as $child2 循环
								continue 3;
							}
							//彩票机上实际预留3位,目前只有2位
							$bettypeOdds->$localValue = sprintf('%.2f', $odds);//保留两位小数
						}
						$oddsMap[$oddsId] = array(
							'bettypeOdds' => $bettypeOdds,
							'concede' => preg_replace('/\+/', '', $concede)//删除让球或让分的+号
						);
					}
					foreach ($updateMatchRecommend as &$rd) {
						$oddsId = (int)$rd['oddsId'];
						$odds = $oddsMap[$oddsId];
						$bettypeOdds = $odds['bettypeOdds'];
						$concede = trim($odds['concede']);
						if ($oddsId <= 0 || empty($odds) || empty($bettypeOdds)) {
							continue;
						}
						$rd['bettypeOdds'] = $bettypeOdds;
						$rd['concede'] = $concede;
					}
					$updateMatchRecommend = json_encode($updateMatchRecommend);
					if ($updateMatchRecommend != $matchRecommend) {
						$ticketField[] = 'matchRecommend="' . $database->escape($updateMatchRecommend) . '"';
					}
					//更新订单赔率
					foreach ($updatePlanMatchRecommend as &$rd) {
						$oddsId = (int)$rd['oddsId'];
						$odds = $oddsMap[$oddsId];
						$bettypeOdds = $odds['bettypeOdds'];
						$concede = trim($odds['concede']);
						if ($oddsId <= 0 || empty($odds) || empty($bettypeOdds)) {
							continue;
						}
						$rd['bettypeOdds'] = $bettypeOdds;
						$rd['concede'] = $concede;
					}
					$updatePlanMatchRecommend = json_encode($updatePlanMatchRecommend);
					if ($updatePlanMatchRecommend != $planMatchRecommend) {
						$field = array();
						$field[] = 'planMatchRecommend="' . $database->escape($updatePlanMatchRecommend) . '"';
						$orderSqlArr[] = 'update t_order set ' . implode(',', $field) . ' where orderId="' . $orderId . '" limit 1';
					}
				}
				//放在这里是因为等待上面更新"赔率"和"让球或让分"
				$ticketSqlArr[] = 'update t_ticket set ' . implode(',', $ticketField) . ' where ticketId="' . $ticketId . '" and status=0 limit 1';
			}
		}
		$orderSqlArr = array_unique($orderSqlArr);
		$ticketSqlArr = array_unique($ticketSqlArr);
		$setOrderIdArr = array_unique($setOrderIdArr);
		$sqlArr = array_merge($orderSqlArr, $ticketSqlArr);
		if (count($sqlArr) <= 0) {
			$database->close();
			$resp->msg = '执行数组异常';
			return $resp;
		}
		$sql = implode(';', $sqlArr);
		$result = $database->multiExecute($sql);
		$database->multiFree();
		if (!$result) {
			$database->close();
			$resp->msg = '出票状态sql执行异常';
			return $resp;
		}
		$database->close();
		if (count($setOrderIdArr) > 0) {
			$message = requireModule('Message');
			foreach ($setOrderIdArr as $orderId) {
				$message->publish('orderTicketStatus', $orderId);
			}
		}
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	//票状态通知
	public function ticketStatusNotify($ticketresults, $orderIdArr, $ticketMap) {
		$resp = requireModule('Resp');
		$orderIdArr = $this->common->filterIdArray($orderIdArr);
		if (!is_array($ticketresults) || count($ticketresults) <= 0 || !is_array($orderIdArr) || count($orderIdArr) <= 0 || !is_array($ticketMap) || count($ticketMap) <= 0) {
			$resp->msg = '参数异常';
			return $resp;
		}
		$param = array();
		$param['orderId'] = $orderIdArr;
		$param['orderType'] = 3;//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=出票订单
		$param['status'] = 2; //订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
		$param['ticketSupplierId'] = $this->supplierId;//出票供应商
		$param['pageNum'] = 1;
		$param['pageSize'] = 50;
		$selectOrderResp = $this->orderService->selectOrder($param);
		if ($selectOrderResp->errCode != 0) {
			$resp->msg = '订单查询异常';
			return $resp;
		}
		$orderList = $selectOrderResp->data['list'];
		$orderList = $this->commonService->setMatchList($orderList, 'planMatchRecommend');
		$orderMap = array();
		foreach ($orderList as $order) {
			$orderId = (int)$order['orderId'];
			if ($orderId > 0) {
				$orderMap[$orderId] = $order;
			}
		}
		if (count($orderMap) <= 0) {
			$resp->msg = '票订单查询异常';
			return $resp;
		}
		$orderSqlArr = array();
		$ticketSqlArr = array();
		$ticketReturnArr = array();
		$setOrderIdArr = array();
		$database = requireModule("Database");
		foreach ($ticketresults as $ticketresult) {
			$ticketId = (int)$ticketresult['ticketId'];
			$platformId = trim($ticketresult['palmId']);
			$statusCode = trim($ticketresult['statusCode']);
			$printOdds = trim($ticketresult['printodd']);
			$printNo = trim($ticketresult['printNo']);
			$printTime = trim($ticketresult['PrintOutTime']);
			$printConcede = trim($ticketresult['rq']);
			$ticket = $ticketMap[$ticketId];
			$matchRecommend = trim($ticket['matchRecommend']);
			$updateMatchRecommend = json_decode($matchRecommend, true);
			$orderId = (int)$ticket['orderId'];
			$order = $orderMap[$orderId];
			$planMatchType = (int)$order['planMatchType'];
			$planMatchRecommend = trim($order['planMatchRecommend']);
			$updatePlanMatchRecommend = json_decode($planMatchRecommend, true);
			$matchList = $order['matchList'];
			$matchMap = array();
			foreach ($matchList as $match) {
				$number = trim($match['number']);
				if (!empty($number)) {
					$matchMap[$number] = $match;
				}
			}
			//statusCode, 000=订单不存在, 001=等待交易, 002=交易中, 003=交易成功, 004=交易失败
			if ($ticketId <= 0 || empty($ticket) || empty($matchRecommend) || empty($updateMatchRecommend) || $orderId <= 0 || empty($order) || $planMatchType <= 0 || empty($planMatchRecommend) || empty($updatePlanMatchRecommend) || empty($matchList) || empty($matchMap) || empty($platformId) || ($statusCode != '003' && $statusCode != '004')) {
				continue;
			}
			$status = 0;//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已撤单
			if ($statusCode == '003') {
				$status = 2;
			} else if ($statusCode == '004') {
				$status = 1;
			}
			//添加更新票信息
			$ticketField = array();
			$ticketField[] = 'status="' . $database->escape($status) . '"';
			$ticketField[] = 'platformId="' . $database->escape($platformId) . '"';
			$ticketField[] = 'printOdds="' . $database->escape($printOdds) . '"';
			$ticketField[] = 'printConcede="' . $database->escape($printConcede) . '"';
			$ticketField[] = 'printNo="' . $database->escape($printNo) . '"';
			$ticketField[] = 'printTime="' . $database->escape($printTime) . '"';
			$ticketReturnArr[] = '<returnticketresult lotteryId="'.$ticketId.'" palmId="'.$platformId.'"/>';
			$setOrderIdArr[] = $orderId;
			if (!empty($printOdds)) {
				//$printOdds普通过关：7-001:[胜=1.250]/7-002:[胜=1.500]
				//$printOdds混合过关：SPF@7-003:[平=3.600,负=1.780]/JQS@7-004:[1=4.700]/BQC@7-005:[胜胜=2.500,平平=5.000]/BF@7-006:[1:1=5.600,2:2=14.00,3:3=70.00]
				$oddsMap = array();
				$matchApp = explode('/', $printOdds);
				foreach ($matchApp as $m) {
					$m = trim($m);
					$mhIndex = strpos($m, ':');
					if ($mhIndex === false) {
						//票信息异常，没必要进行以下的比赛，跳回 $child1->children() as $child2 循环
						continue 2;
					}
					$app = array(substr($m, 0, $mhIndex), substr($m, $mhIndex + 1));
					$number = null;
					$bettypeIndex = strpos($app[0], '@');
					if ($bettypeIndex !== false) {
						$number = substr($app[0], $bettypeIndex + 1);
					} else {
						$number = $app[0];
					}
					$numberApp = explode('-', $number);
					if (!is_array($numberApp) || count($numberApp) != 2) {
						//票信息异常，没必要进行以下的比赛，跳回 $child1->children() as $child2 循环
						continue 2;
					}
					$week = $this->weekMap[(int)$numberApp[0]];
					$match = $matchMap[$week.trim($numberApp[1])];
					$oddsId = (int)$match['oddsId'];
					$bettypeContent = trim($match['bettypeContent']);
					$bettypeOdds = $match['bettypeOdds'];
					if (empty($week) || empty($match) || $oddsId <= 0 || empty($bettypeContent) || empty($bettypeOdds)) {
						//票信息异常，没必要进行以下的比赛，跳回 $child1->children() as $child2 循环
						continue 2;
					}
					$concede = 0;
					//只有足球的'让球胜平负'$printConcede才有值
					if (!empty($printConcede)) {
						//$printConcede类似：7-019=-1;7-020=-2;7-021=+1
						$pattern = '/'.$number.'=([^;]*)/';
						$temp = null;
						preg_match($pattern, $printConcede, $temp);
						if (is_array($temp) && count($temp) == 2) {
							$concede = $temp[1]+0;//转换成数字
						}
					}
					//玩法选项,类似：[平=3.600,负=1.780] 或 [主胜=1.820^+7.5](只有篮球的'让分胜负'和'大小球'才有这种写法)
					$itemList = explode(',', preg_replace('/[\[\]]/', '', trim($app[1])));
					foreach ($itemList as $item) {
						$itemApp = explode('=', trim($item));
						if (!is_array($itemApp) || count($itemApp) != 2) {
							//票信息异常，没必要进行以下的比赛，跳回 $child1->children() as $child2 循环
							continue 3;
						}
						$value = trim($itemApp[0]);
						$odds = trim($itemApp[1]);
						$concedeApp = explode('^', $odds);
						if (is_array($concedeApp) && count($concedeApp) == 2) {
							$odds = trim($concedeApp[0]);
							$concede = trim($concedeApp[1]);
						}
						$valueMap = $this->lotteryMap[$planMatchType][$bettypeContent]['value'];
						$localValue = $valueMap[$value];
						if (empty($odds) || !key_exists($value, $valueMap)) {
							//票信息异常，没必要进行以下的比赛，跳回 $child1->children() as $child2 循环
							continue 3;
						}
						//彩票机上实际预留3位,目前只有2位
						$bettypeOdds->$localValue = sprintf('%.2f', $odds);//保留两位小数
					}
					$oddsMap[$oddsId] = array(
						'bettypeOdds' => $bettypeOdds,
						'concede' => preg_replace('/\+/', '', $concede)//删除让球或让分的+号
					);
				}
				foreach ($updateMatchRecommend as &$rd) {
					$oddsId = (int)$rd['oddsId'];
					$odds = $oddsMap[$oddsId];
					$bettypeOdds = $odds['bettypeOdds'];
					$concede = trim($odds['concede']);
					if ($oddsId <= 0 || empty($odds) || empty($bettypeOdds)) {
						continue;
					}
					$rd['bettypeOdds'] = $bettypeOdds;
					$rd['concede'] = $concede;
				}
				$updateMatchRecommend = json_encode($updateMatchRecommend);
				if ($updateMatchRecommend != $matchRecommend) {
					$ticketField[] = 'matchRecommend="' . $database->escape($updateMatchRecommend) . '"';
				}
				//更新订单赔率
				foreach ($updatePlanMatchRecommend as &$rd) {
					$oddsId = (int)$rd['oddsId'];
					$odds = $oddsMap[$oddsId];
					$bettypeOdds = $odds['bettypeOdds'];
					$concede = trim($odds['concede']);
					if ($oddsId <= 0 || empty($odds) || empty($bettypeOdds)) {
						continue;
					}
					$rd['bettypeOdds'] = $bettypeOdds;
					$rd['concede'] = $concede;
				}
				$updatePlanMatchRecommend = json_encode($updatePlanMatchRecommend);
				if ($updatePlanMatchRecommend != $planMatchRecommend) {
					$field = array();
					$field[] = 'planMatchRecommend="' . $database->escape($updatePlanMatchRecommend) . '"';
					$orderSqlArr[] = 'update t_order set ' . implode(',', $field) . ' where orderId="' . $orderId . '" limit 1';
				}
			}
			//放在这里是因为等待上面更新"赔率"和"让球或让分"
			$ticketSqlArr[] = 'update t_ticket set ' . implode(',', $ticketField) . ' where ticketId="' . $ticketId . '" and status=0 limit 1';
		}
		$orderSqlArr = array_unique($orderSqlArr);
		$ticketSqlArr = array_unique($ticketSqlArr);
		$ticketReturnArr = array_unique($ticketReturnArr);
		$setOrderIdArr = array_unique($setOrderIdArr);
		$sqlArr = array_merge($orderSqlArr, $ticketSqlArr);
		if (count($sqlArr) <= 0 || count($ticketReturnArr) <= 0) {
			$database->close();
			$resp->msg = '执行数组异常';
			return $resp;
		}
		$sql = implode(';', $sqlArr);
		$result = $database->multiExecute($sql);
		$database->multiFree();
		if (!$result) {
			$database->close();
			$resp->msg = '出票状态sql执行异常';
			return $resp;
		}
		$database->close();
		if (count($setOrderIdArr) > 0) {
			$message = requireModule('Message');
			foreach ($setOrderIdArr as $orderId) {
				$message->publish('orderTicketStatus', $orderId);
			}
		}
		$resp->data = $ticketReturnArr;
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	//打印票状态
	public function printTicketStatus() {
		$resp = requireModule('Resp');
		$ticketIdArr = array(15531);
		foreach ($ticketIdArr as $ticketId) {
			$ticketId = (int)$ticketId;
			if ($ticketId <= 0) {
				continue;
			}
			$tickets[] = '<queryticket ticketId="'.$ticketId.'" />';
		}
		$body = implode('', $tickets);
		$requestResp = $this->request('003', $body);
		if ($requestResp->errCode != 0 || empty($requestResp->data)) {
			$resp->msg = '出票请求有误';
			return $resp;
		}
		print_r($requestResp);
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	//查询票算奖
	public function ticketPrize() {
		$resp = requireModule('Resp');
		$param = array();
		$param['supplierId'] = $this->supplierId;
		$param['hasPlatformId'] = true;
		$param['status'] = array(1,2);//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已撤单
		$param['needSport'] = true;
		$param['justCount'] = true;
		$selectTicketResp = $this->ticketService->selectTicket($param);
		if ($selectTicketResp->errCode != 0) {
			$resp->msg = '票查询异常';
			return $resp;
		}
		$data = $selectTicketResp->data;
		$totalCount = (int)$data['totalCount'];
		$pageSum = (int)ceil($totalCount/20);
		if ($totalCount <= 0 || $pageSum <= 0) {
			$resp->msg = '不存在需要算奖的票';
			return $resp;
		}
		for ($i = 1; $i <= $pageSum; $i++) {
			$this->doTicketPrize($i);
		}
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	//查询票算奖
	private function doTicketPrize($pageNum) {
		$resp = requireModule('Resp');
		$pageNum = (int)$pageNum;
		if ($pageNum <= 0) {
			$resp->msg = '票页码异常';
			return $resp;
		}
		$param = array();
		$param['supplierId'] = $this->supplierId;
		$param['hasPlatformId'] = true;
		$param['status'] = array(1,2);//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已撤单
		$param['needSport'] = true;
		$param['orderBy'] = 1;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = 20;//一次最多20个查询
		$selectTicketResp = $this->ticketService->selectTicket($param);
		if ($selectTicketResp->errCode != 0) {
			$resp->msg = '票查询异常';
			return $resp;
		}
		$ticketList = $selectTicketResp->data['list'];
		$tickets = array();
		$ticketMap = array();
		foreach ($ticketList as $ticket) {
			$orderId = (int)$ticket['orderId'];
			$ticketId = (int)$ticket['ticketId'];
			$status = (int)$ticket['status'];
			if ($orderId <= 0 || $ticketId <= 0 || ($status != 1 && $status != 2)) {
				continue;
			}
			$tickets[] = '<queryprize TicketId="'.$ticketId.'" />';
			$ticketMap[$ticketId] = $ticket;
		}
		if (count($tickets) <= 0 || count($ticketMap) <= 0) {
			$resp->msg = '不存在需要算奖的票';
			return $resp;
		}
		$body = implode('', $tickets);
		$requestResp = $this->request('011', $body);
		if ($requestResp->errCode != 0 || empty($requestResp->data)) {
			$resp->msg = '出票算奖请求有误';
			return $resp;
		}
		$xml = $requestResp->data;
		$setOrderIdArr = array();
		$sqlArr = array();
		$database = requireModule("Database");
		$wonticketsNode = null;
		foreach ($xml->children() as $child1) {
			$nodeName1 = trim($child1->getName());
			if ($nodeName1 != 'body') {
				continue;
			}
			foreach ($child1->children() as $child2) {
				$nodeName2 = trim($child2->getName());
				if ($nodeName2 == 'wontickets') {
					$wonticketsNode = $child2;
					break;
				}
			}
		}
		if ($wonticketsNode == null) {
			$resp->msg = '出票算奖请求有误';
			return $resp;
		}
		foreach ($wonticketsNode->children() as $wonticket) {
			$ticketId = (int)$wonticket['ticketId'];
			$platformId = trim($wonticket['palmId']);
			$state = trim($wonticket['state']);//0=撤单, 1=未开奖, 2=已中奖(包含未派奖和派奖), 3=未中奖, 4=订单不存在
			$prizeAmount = trim($wonticket['prize']) * 100;//税后奖金
			$pretaxPrizeAmount = trim($wonticket['pretaxPrice']) * 100;//税前奖金
			$ticket = $ticketMap[$ticketId];
			$orderId = (int)$ticket['orderId'];
			$status = (int)$ticket['status'];//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已撤单
			if ($ticketId <= 0 || empty($platformId) || empty($ticket) || $orderId <= 0 || ($status != 1 && $status != 2)) {
				continue;
			}
			$tStatus = null;//等待设置的票状态
			if ($status == 1) {
				if ($state == 0) {
					$tStatus = 5;
				}
			} else if ($status == 2) {
				if ($state == 2) {
					$tStatus = 4;
				} else if ($state == 3) {
					$tStatus = 3;
				}
			}
			if ($tStatus === null) {
				continue;
			}
			$setOrderIdArr[] = $orderId;
			$field = array();
			$field[] = 'status="' . $database->escape($tStatus) . '"';
			if ($status == 2 && $state == 2 && $tStatus == 4 && $prizeAmount > 0 && $pretaxPrizeAmount > 0) {
				$field[] = 'prizeAmount="' . $database->escape($prizeAmount) . '"';
				$field[] = 'pretaxPrizeAmount="' . $database->escape($pretaxPrizeAmount) . '"';
			}
			$sqlArr[] = 'update t_ticket set ' . implode(',', $field) . ' where ticketId="' . $ticketId . '" and platformId="'.$database->escape($platformId).'" and status="'.$database->escape($status).'" limit 1';
		}
		$setOrderIdArr = array_unique($setOrderIdArr);
		$sqlArr = array_unique($sqlArr);
		if (count($sqlArr) > 0) {
			$sql = implode(';', $sqlArr);
			$result = $database->multiExecute($sql);
			$database->multiFree();
			if (!$result) {
				$database->close();
				$resp->msg = '出票算奖sql执行异常';
				return $resp;
			}
		}
		$database->close();
		if (count($setOrderIdArr) > 0) {
			$message = requireModule('Message');
			foreach ($setOrderIdArr as $orderId) {
				$message->publish('orderTicketPrize', $orderId);
			}
		}
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	//票中奖通知
	public function ticketPrizeNotify($wonticketsNode, $ticketMap) {
		$resp = requireModule('Resp');
		if (!is_array($wonticketsNode) || count($wonticketsNode) <= 0 || !is_array($ticketMap) || count($ticketMap) <= 0) {
			$resp->msg = '参数异常';
			return $resp;
		}
		$ticketReturnArr = array();
		$setOrderIdArr = array();
		$sqlArr = array();
		$database = requireModule("Database");
		foreach ($wonticketsNode as $wonticket) {
			$ticketId = (int)$wonticket['ticketId'];
			$platformId = trim($wonticket['palmId']);
			$state = trim($wonticket['state']);//2:已结算
			$prizeAmount = trim($wonticket['prize']) * 100;//税后奖金
			$pretaxPrizeAmount = trim($wonticket['pretaxPrice']) * 100;//税前奖金
			$ticket = $ticketMap[$ticketId];
			$orderId = (int)$ticket['orderId'];
			$status = (int)$ticket['status'];//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已撤单
			if ($ticketId <= 0 || empty($platformId) || $state != 2 || $prizeAmount <= 0 || $pretaxPrizeAmount <= 0 || empty($ticket) || $orderId <= 0 || $status != 2) {
				continue;
			}
			$ticketReturnArr[] = '<returnwonticket lotteryId="'.$ticketId.'" palmId="'.$platformId.'"/>';
			$setOrderIdArr[] = $orderId;
			$tStatus = 4;
			$field = array();
			$field[] = 'status="' . $database->escape($tStatus) . '"';
			$field[] = 'prizeAmount="' . $database->escape($prizeAmount) . '"';
			$field[] = 'pretaxPrizeAmount="' . $database->escape($pretaxPrizeAmount) . '"';
			$sqlArr[] = 'update t_ticket set ' . implode(',', $field) . ' where ticketId="' . $ticketId . '" and platformId="'.$database->escape($platformId).'" and status="'.$database->escape($status).'" limit 1';
		}
		$ticketReturnArr = array_unique($ticketReturnArr);
		$setOrderIdArr = array_unique($setOrderIdArr);
		$sqlArr = array_unique($sqlArr);
		if (count($sqlArr) > 0) {
			$sql = implode(';', $sqlArr);
			$result = $database->multiExecute($sql);
			$database->multiFree();
			if (!$result) {
				$database->close();
				$resp->msg = '出票算奖sql执行异常';
				return $resp;
			}
		}
		$database->close();
		if (count($setOrderIdArr) > 0) {
			$message = requireModule('Message');
			foreach ($setOrderIdArr as $orderId) {
				$message->publish('orderTicketPrize', $orderId);
			}
		}
		$resp->data = $ticketReturnArr;
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

/********************************************************************* 竞彩和数字彩分割线  **************************************************************************/


	//数字彩出票
	public function digitalTicketDeal() {
		$resp = requireModule('Resp');
		$param = array();
		$param['ticketSupplierId'] = $this->supplierId;//出票供应商
		$param['orderType'] = 7;//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=竞彩出票订单, 4=彩金充值订单, 5=晒米冷热订单, 6=极限追盘订单, 7=数字彩出票订单
		$param['status'] = 2; //订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
		$param['ticketStatus'] = 0;//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
		$param['pageNum'] = 1;
		$param['pageSize'] = 200;
		$selectOrderResp = $this->orderService->selectOrder($param);
		if ($selectOrderResp->errCode != 0) {
			$resp->msg = '订单查询异常';
			return $resp;
		}
		$orderList = $selectOrderResp->data['list'];
		if (!is_array($orderList) || count($orderList) <= 0) {
			$resp->msg = '不存在需要出的票';
			return $resp;
		}
		for ($i = 0, $length = count($orderList); $i < $length; $i++) {
			$order = $orderList[$i];
			$orderId = (int)$order['orderId'];
			$orderType = (int)$order['orderType'];
			$status = (int)$order['status'];
			$ticketStatus = (int)$order['ticketStatus'];
			$ticketMultiple = (int)$order['ticketMultiple'];
			$amount = (int)$order['amount'];
			if ($orderId <= 0 || $orderType != 7 || $status != 2 || $ticketStatus != 0 || $ticketMultiple <= 0 || $amount <= 0) {
				continue;
			}
			$this->requestDigitalTicket($order);
		}
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	public function orderDigitalTicketDeal($orderIdArr) {
		$resp = requireModule('Resp');
		if (count($orderIdArr) <= 0) {
			$resp->msg = 'orderIdArr参数有误';
			return $resp;
		}
		$param = array();
		$param['ticketSupplierId'] = $this->supplierId;//出票供应商
		$param['orderId'] = $orderIdArr;
		$param['orderType'] = 7;//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=竞彩出票订单, 4=彩金充值订单, 5=晒米冷热订单, 6=极限追盘订单, 7=数字彩出票订单
		$param['status'] = 2; //订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
		$param['ticketStatus'] = 0;//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
		$param['pageNum'] = 1;
		$param['pageSize'] = 60;
		$selectOrderResp = $this->orderService->selectOrder($param);
		if ($selectOrderResp->errCode != 0) {
			$resp->msg = '订单查询异常';
			return $resp;
		}
		$orderList = $selectOrderResp->data['list'];
		if (!is_array($orderList) || count($orderList) <= 0) {
			$resp->msg = '不存在需要出的票';
			return $resp;
		}
		for ($i = 0, $length = count($orderList); $i < $length; $i++) {
			$order = $orderList[$i];
			$orderId = (int)$order['orderId'];
			$orderType = (int)$order['orderType'];
			$status = (int)$order['status'];
			$ticketStatus = (int)$order['ticketStatus'];
			$ticketMultiple = (int)$order['ticketMultiple'];
			$amount = (int)$order['amount'];
			if ($orderId <= 0 || $orderType != 7 || $status != 2 || $ticketStatus != 0 || $ticketMultiple <= 0 || $amount <= 0) {
				continue;
			}
			$this->requestDigitalTicket($order);
		}
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	private function requestDigitalTicket($order) {
		$resp = requireModule('Resp');
		if (empty($order)) {
			$resp->msg = 'order参数有误';
			return $resp;
		}
		$orderId = (int)$order['orderId'];
		$userId = (int)$order['userId'];
		$nickName = trim($order['nickName']);
		$realName = trim($order['realName']);
		$orderType = (int)$order['orderType'];
		$status = (int)$order['status'];
		$ticketStatus = (int)$order['ticketStatus'];
		$ticketAppend = (int)$order['ticketAppend'];
		$ticketUnit = (int)$order['ticketUnit'];
		$ticketMultiple = (int)$order['ticketMultiple'];
		$amount = (int)$order['amount'];
		$issue = trim($order['issue']);
		$lotteryId = trim($order['lotteryId']);
		$betContent = trim($order['betContent']);
		if ($orderId <= 0 || $userId <= 0 || $orderType != 7 || $status != 2 || $ticketStatus != 0 || $ticketUnit <= 0 || $ticketMultiple <= 0 || $amount <= 0 || empty($issue) || empty($lotteryId) || empty($betContent)) {
			$resp->msg = '订单数据异常';
			return $resp;
		}
		//下单接口一次最大只能出50张票；一张订单可以多张票,因为单票最大50倍
        $maxTicketMultiple = 50;    //以小的倍数为准
        if ($lotteryId == 'SSQ') {
            if ($ticketMultiple > 99) {
                $resp->msg = '双色球订单倍数异常';
                return $resp;
            }
            $maxTicketMultiple = 50;
        } else if ($lotteryId == 'JSK3') {
            if ($ticketMultiple > 9999) {
                $resp->msg = '江苏快3订单倍数异常';
                return $resp;
            }
            $maxTicketMultiple = 99;
        } else if ($lotteryId == 'DLT') {
			if ($ticketMultiple > 99) {
				$resp->msg = '大乐透订单倍数异常';
				return $resp;
			}
			$maxTicketMultiple = 99;
		} else if ($lotteryId == 'GX11X5') {
            if ($ticketMultiple > 9999) {
                $resp->msg = '广西11选5订单倍数异常';
                return $resp;
            }
            $maxTicketMultiple = 99;
        } else if ($lotteryId == 'FC3D') {
			if ($ticketMultiple > 9999) {
				$resp->msg = '福彩3D订单倍数异常';
				return $resp;
			}
			$maxTicketMultiple = 50;
		}
		$ticketsnum = ceil($ticketMultiple/$maxTicketMultiple);
		if ($ticketsnum <= 0) {
			$this->common->logger->info('订单票数('.$ticketsnum.')异常');
			$resp->msg = '订单票数异常';
			return $resp;
		}
		//算出注数和金额
		$calculateDigitalTicketResp = $this->commonService->calculateDigitalTicket($lotteryId, $betContent);
		if ($calculateDigitalTicketResp->errCode != 0) {
			$this->common->logger->info('orderId('.$orderId.')：'.$calculateDigitalTicketResp->msg);
			$resp->msg = $calculateDigitalTicketResp->msg;
			return $resp;
		}
		$ticketArr = $calculateDigitalTicketResp->data;
		if (!is_array($ticketArr) || count($ticketArr) <= 0) {
			$this->common->logger->info('orderId('.$orderId.')：投注格式异常');
			$resp->msg = '投注格式异常';
			return $resp;
		}
		$betContentArr = array();//投注数组
		if ($lotteryId == 'SSQ') {
            $dsBetContentArr = array();//单式投注
            //单式支持一票五注,复式一票一注
            for ($i = 0, $length = count($ticketArr); $i < $length; $i++) {
				$unit = (int)$ticketArr[$i]['ticketUnit'];
                $content = trim($ticketArr[$i]['betContent']);
				$formatBetContentResp = $this->formatBetContent($lotteryId, $content);
				$formatData = $formatBetContentResp->data;
				if ($formatBetContentResp->errCode != 0 || empty($formatData)) {
					$resp->msg = '出票格式转换异常';
					return $resp;
				}
				$ticketBetType = trim($formatData['betType']);
				$ticketBetContent = trim($formatData['betContent']);
                if ($ticketBetType == 'DS') {
                    $dsBetContentArr[] = array('betType' => $ticketBetType, 'ticketUnit' => $unit, 'betContent' => $ticketBetContent);
                } else if ($ticketBetType == 'FS') {
                    $betContentArr[] = array('betType' => $ticketBetType, 'ticketUnit' => $unit, 'betContent' => $ticketBetContent);
                }
            }
            $countNum = 0;
            $countArr = array();
            for ($i = 0, $length = count($dsBetContentArr); $i < $length; $i++) {
                $countNum++;
                $countArr[] = trim($dsBetContentArr[$i]['betContent']);
                if ($i == ($length - 1) || $countNum == 5) {
                    $betContentArr[] = array('betType' => 'DS', 'ticketUnit' => $countNum, 'betContent' => implode(';', $countArr));
                    $countNum = 0;
                    $countArr = array();
                }
            }
	    } else if ($lotteryId == 'JSK3') {
            //江苏快3出票格式转换
            //支持一票五注：二同号单选2TDX，三同号单选3TDX，三不同号单式3BTDS
            $_2TDXBetContentArr = array();
			$_2TFXBetContentArr = array();
			$_2BTDSBetContentArr = array();
			$_3TDXBetContentArr = array();
            $_3BTDSBetContentArr = array();
			$_HZBetContentArr = array();
            for ($i = 0, $length = count($ticketArr); $i < $length; $i++) {
                $betContentItem = $ticketArr[$i]['betContentItem'];
				foreach ($betContentItem as $item) {
					$item = trim($item);
					$formatBetContentResp = $this->formatBetContent($lotteryId, $item);
					$formatData = $formatBetContentResp->data;
					if ($formatBetContentResp->errCode != 0 || empty($formatData)) {
						$resp->msg = '出票格式转换异常';
						return $resp;
					}
					$ticketBetType = trim($formatData['betType']);
					$ticketBetContent = trim($formatData['betContent']);
					if ($ticketBetType == '2TDX') {
						$_2TDXBetContentArr[] = $ticketBetContent;
					} else if ($ticketBetType == '2TFX') {
						$_2TFXBetContentArr[] = $ticketBetContent;
					} else if ($ticketBetType == '2BTDS') {
						$_2BTDSBetContentArr[] = $ticketBetContent;
					} else if ($ticketBetType == '3TDX') {
						$_3TDXBetContentArr[] = $ticketBetContent;
					} else if ($ticketBetType == '3TTX' || $ticketBetType == '3LTX') {
						$betContentArr[] = array('betType' => $ticketBetType, 'ticketUnit' => 1, 'betContent' => $ticketBetContent);
					} else if ($ticketBetType == '3BTDS') {
						$_3BTDSBetContentArr[] = $ticketBetContent;
					} else if ($ticketBetType == 'HZ') {
						$_HZBetContentArr[] = $ticketBetContent;
					}
				}
            }
			//二同号单选
			$countNum = 0;
			$countArr = array();
			for ($i = 0, $length = count($_2TDXBetContentArr); $i < $length; $i++) {
				$countNum++;
				$countArr[] = trim($_2TDXBetContentArr[$i]);
				if ($i == ($length - 1) || $countNum == 5) {
					$betContentArr[] = array('betType' => '2TDX', 'ticketUnit' => $countNum, 'betContent' => implode(';', $countArr));
					$countNum = 0;
					$countArr = array();
				}
			}
			//二同号复选
			$countNum = count($_2TFXBetContentArr);
			if ($countNum > 0) {
				$separateDuplicateResp = $this->separateDuplicate($lotteryId, '2TFX', $_2TFXBetContentArr);
				$separateDuplicateData = $separateDuplicateResp->data;
				if ($separateDuplicateResp->errCode != 0 || !is_array($separateDuplicateData) || count($separateDuplicateData) <= 0) {
					$resp->msg = '出票格式分离重复异常';
					return $resp;
				}
				$betContentArr = array_merge($betContentArr, $separateDuplicateData);
			}
			//二不同号单式
			$countNum = count($_2BTDSBetContentArr);
			if ($countNum > 0) {
				sort($_2BTDSBetContentArr);
				if ($countNum == 1) {
					$betContentArr[] = array('betType' => '2BTDS', 'ticketUnit' => $countNum, 'betContent' => $_2BTDSBetContentArr[0]);
				} else {
					$separateDuplicateResp = $this->separateDuplicate($lotteryId, '2BTFS', $_2BTDSBetContentArr);
					$separateDuplicateData = $separateDuplicateResp->data;
					if ($separateDuplicateResp->errCode != 0 || !is_array($separateDuplicateData) || count($separateDuplicateData) <= 0) {
						$resp->msg = '出票格式分离重复异常';
						return $resp;
					}
					$betContentArr = array_merge($betContentArr, $separateDuplicateData);
				}
			}
			//三同号单选
			$countNum = 0;
			$countArr = array();
			for ($i = 0, $length = count($_3TDXBetContentArr); $i < $length; $i++) {
				$countNum++;
				$countArr[] = trim($_3TDXBetContentArr[$i]);
				if ($i == ($length - 1) || $countNum == 5) {
					$betContentArr[] = array('betType' => '3TDX', 'ticketUnit' => $countNum, 'betContent' => implode(';', $countArr));
					$countNum = 0;
					$countArr = array();
				}
			}
			//三不同号单式
			$countNum = 0;
			$countArr = array();
			for ($i = 0, $length = count($_3BTDSBetContentArr); $i < $length; $i++) {
				$countNum++;
				$countArr[] = trim($_3BTDSBetContentArr[$i]);
				if ($i == ($length - 1) || $countNum == 5) {
					$betContentArr[] = array('betType' => '3BTDS', 'ticketUnit' => $countNum, 'betContent' => implode(';', $countArr));
					$countNum = 0;
					$countArr = array();
				}
			}
			//和值单式
			$countNum = count($_HZBetContentArr);
			if ($countNum > 0) {
				sort($_HZBetContentArr);
				if ($countNum == 1) {
					$betContentArr[] = array('betType' => 'HZ', 'ticketUnit' => $countNum, 'betContent' => $_HZBetContentArr[0]);
				} else {
					$separateDuplicateResp = $this->separateDuplicate($lotteryId, 'HZFS', $_HZBetContentArr);
					$separateDuplicateData = $separateDuplicateResp->data;
					if ($separateDuplicateResp->errCode != 0 || !is_array($separateDuplicateData) || count($separateDuplicateData) <= 0) {
						$resp->msg = '出票格式分离重复异常';
						return $resp;
					}
					$betContentArr = array_merge($betContentArr, $separateDuplicateData);
				}
			}
        } else if ($lotteryId == 'DLT') {
			$dsBetContentArr = array();//单式投注
			//单式支持一票五注,复式一票一注
			for ($i = 0, $length = count($ticketArr); $i < $length; $i++) {
				$unit = (int)$ticketArr[$i]['ticketUnit'];
				$content = trim($ticketArr[$i]['betContent']);
				$formatBetContentResp = $this->formatBetContent($lotteryId, $content);
				$formatData = $formatBetContentResp->data;
				if ($formatBetContentResp->errCode != 0 || empty($formatData)) {
					$resp->msg = '出票格式转换异常';
					return $resp;
				}
				$ticketBetType = trim($formatData['betType']);
				$ticketBetContent = trim($formatData['betContent']);
				if ($ticketBetType == 'DS') {
					$dsBetContentArr[] = array('betType' => $ticketBetType, 'ticketUnit' => $unit, 'betContent' => $ticketBetContent);
				} else if ($ticketBetType == 'FS') {
					$betContentArr[] = array('betType' => $ticketBetType, 'ticketUnit' => $unit, 'betContent' => $ticketBetContent);
				}
			}
			$countNum = 0;
			$countArr = array();
			for ($i = 0, $length = count($dsBetContentArr); $i < $length; $i++) {
				$countNum++;
				$countArr[] = trim($dsBetContentArr[$i]['betContent']);
				if ($i == ($length - 1) || $countNum == 5) {
					$betContentArr[] = array('betType' => 'DS', 'ticketUnit' => $countNum, 'betContent' => implode(';', $countArr));
					$countNum = 0;
					$countArr = array();
				}
			}
		} else if ($lotteryId == 'GX11X5') {
			//单式支持一票五注
			$betContentMap = array(
				"11_RX2" => array(),
				"11_RX3" => array(),
				"11_RX4" => array(),
				"11_RX5" => array(),
				"11_RX6" => array(),
				"11_RX7" => array(),
				"11_RX8" => array(),
				"11_ZXQ2_D" => array(),
				"11_ZXQ3_D" => array(),
				"11_ZXQ2" => array(),
				"11_ZXQ3" => array()
			);
			$_11_RX1BetContentArr = array();//11_RX1要特别处理，因为不支持一票五注
			for ($i = 0, $length = count($ticketArr); $i < $length; $i++) {
				$betContentItem = $ticketArr[$i]['betContentItem'];
				foreach ($betContentItem as $item) {
					$item = trim($item);
					$formatBetContentResp = $this->formatBetContent($lotteryId, $item);
					$formatData = $formatBetContentResp->data;
					if ($formatBetContentResp->errCode != 0 || empty($formatData)) {
						$resp->msg = '出票格式转换异常';
						return $resp;
					}
					$ticketBetType = trim($formatData['betType']);
					$ticketBetContent = trim($formatData['betContent']);
					if ($ticketBetType == '11_RX1') {
						$_11_RX1BetContentArr[] = $ticketBetContent;
					} else {
						$betContentMap[$ticketBetType][] = $ticketBetContent;
					}
				}
			}
			foreach ($betContentMap as $ticketBetType => $ticketBetContentArr) {
				$countNum = 0;
				$countArr = array();
				for ($i = 0, $length = count($ticketBetContentArr); $i < $length; $i++) {
					$countNum++;
					$countArr[] = trim($ticketBetContentArr[$i]);
					if ($i == ($length - 1) || $countNum == 5) {
						$betContentArr[] = array('betType' => $ticketBetType, 'ticketUnit' => $countNum, 'betContent' => implode(';', $countArr));
						$countNum = 0;
						$countArr = array();
					}
				}
			}
			$countNum = count($_11_RX1BetContentArr);
			if ($countNum > 0) {
				$separateDuplicateResp = $this->separateDuplicate($lotteryId, '11_RX1', $_11_RX1BetContentArr);
				$separateDuplicateData = $separateDuplicateResp->data;
				if ($separateDuplicateResp->errCode != 0 || !is_array($separateDuplicateData) || count($separateDuplicateData) <= 0) {
					$resp->msg = '出票格式分离重复异常';
					return $resp;
				}
				$betContentArr = array_merge($betContentArr, $separateDuplicateData);
			}
        } else if ($lotteryId == 'FC3D') {
			//支持一票五注：直选单式ZXDS, 组选单式ZX_DS(组六)
			$_ZXDSBetContentArr = array();
			$_ZX_DSBetContentArr = array();
			for ($i = 0, $length = count($ticketArr); $i < $length; $i++) {
				$betContentItem = $ticketArr[$i]['betContentItem'];
				foreach ($betContentItem as $item) {
					$item = trim($item);
					$formatBetContentResp = $this->formatBetContent($lotteryId, $item);
					$formatData = $formatBetContentResp->data;
					if ($formatBetContentResp->errCode != 0 || empty($formatData)) {
						$resp->msg = '出票格式转换异常';
						return $resp;
					}
					$ticketBetType = trim($formatData['betType']);
					$ticketBetContent = trim($formatData['betContent']);
					if ($ticketBetType == 'ZXDS') {
						$_ZXDSBetContentArr[] = $ticketBetContent;
					} else if ($ticketBetType == 'ZXHZ') {
						$ticketUnitMap = array(
							"0" => 1,
							"1" => 3,
							"2" => 6,
							"3" => 10,
							"4" => 15,
							"5" => 21,
							"6" => 28,
							"7" => 36,
							"8" => 45,
							"9" => 55,
							"10" => 63,
							"11" => 69,
							"12" => 73,
							"13" => 75,
							"14" => 75,
							"15" => 73,
							"16" => 69,
							"17" => 63,
							"18" => 55,
							"19" => 45,
							"20" => 36,
							"21" => 28,
							"22" => 21,
							"23" => 15,
							"24" => 10,
							"25" => 6,
							"26" => 3,
							"27" => 1
						);
						$tUnit = (int)$ticketUnitMap[$ticketBetContent];
						if (!key_exists($ticketBetContent, $ticketUnitMap) || $tUnit <= 0) {
							$resp->msg = '福彩3D和值倍数有误';
							return $resp;
						}
						$betContentArr[] = array('betType' => $ticketBetType, 'ticketUnit' => $tUnit, 'betContent' => $ticketBetContent);
					} else if ($ticketBetType == 'ZX_DS') {
						$tbContentArr = explode(';', trim($ticketBetContent));
						$tbContentArrLength = count($tbContentArr);
						if ($tbContentArrLength == 2) {//组三
							$betContentArr[] = array('betType' => $ticketBetType, 'ticketUnit' => $tbContentArrLength, 'betContent' => $ticketBetContent);
						} else if ($tbContentArrLength == 1) {//组六
							$_ZX_DSBetContentArr[] = $ticketBetContent;
						}
					}
				}
			}
			//直选单式 ZXDS
			$countNum = 0;
			$countArr = array();
			for ($i = 0, $length = count($_ZXDSBetContentArr); $i < $length; $i++) {
				$countNum++;
				$countArr[] = trim($_ZXDSBetContentArr[$i]);
				if ($i == ($length - 1) || $countNum == 5) {
					$betContentArr[] = array('betType' => 'ZXDS', 'ticketUnit' => $countNum, 'betContent' => implode(';', $countArr));
					$countNum = 0;
					$countArr = array();
				}
			}
			//组选单式 ZX_DS
			$countNum = 0;
			$countArr = array();
			for ($i = 0, $length = count($_ZX_DSBetContentArr); $i < $length; $i++) {
				$countNum++;
				$countArr[] = trim($_ZX_DSBetContentArr[$i]);
				if ($i == ($length - 1) || $countNum == 5) {
					$betContentArr[] = array('betType' => 'ZX_DS', 'ticketUnit' => $countNum, 'betContent' => implode(';', $countArr));
					$countNum = 0;
					$countArr = array();
				}
			}
		}
		$countAmount = 0;
		$countTicketUnit = 0;
		$insertDataArr = array();
		$sqlArr = array();
		$database = requireModule("Database");
		foreach ($betContentArr as $item) {
			$betType = trim($item['betType']);
			$betUnits = (int)$item['ticketUnit'];
			$betContent = trim($item['betContent']);
			if (empty($betType) || $betUnits <= 0) {
				$database->close();
				$resp->msg = '投注格式异常';
				return $resp;
			}
			//empty($betContent)会出错，因为在ZXHZ的时候$betContent可以是0
			if ($lotteryId != 'FC3D' || $betType != 'ZXHZ') {
				if (empty($betContent)) {
					$database->close();
					$resp->msg = '投注格式异常';
					return $resp;
				}
			}
			$countTicketUnit += $betUnits;
			$lottery = $this->lotteryMap[$lotteryId];
			$ticketLotteryId = trim($lottery['ticketLotteryId']);
			$lotteryId = trim($lottery['lotteryId']);
			$lotteryName = trim($lottery['lotteryName']);
			if (empty($lottery) || empty($ticketLotteryId) || empty($lotteryId) || empty($lotteryName)) {
				$database->close();
				$resp->msg = '出票彩种异常';
				return $resp;
			}
			for ($i = 0; $i < $ticketsnum; $i++) {
				$multiple = 0;
				if ($ticketsnum == 1) {
					$multiple = $ticketMultiple;
				} else if (($i == $ticketsnum - 1) && ($ticketMultiple % $maxTicketMultiple) != 0) {
					$multiple = (int)($ticketMultiple % $maxTicketMultiple);
				} else {
					$multiple = $maxTicketMultiple;
				}
				$baseAmount = $ticketAppend == 1 ? 3 : 2;//追加是3元1注
				$betMoney = (int)($multiple*$betUnits*$baseAmount);
				if ($multiple <= 0 || $betMoney <= 0) {
					$database->close();
					$resp->msg = '出票金额,倍数有误';
					return $resp;
				}
				$countAmount += $betMoney * 100;
				$field = array();
				$field[] = 'orderId="' . $database->escape($orderId) . '"';
				$field[] = 'userId="' . $database->escape($userId) . '"';
				$field[] = 'nickName="' . $database->escape($nickName) . '"';
				$field[] = 'realName="' . $database->escape($realName) . '"';
				$field[] = 'supplierId="' . $database->escape($this->supplierId) . '"';
				$field[] = 'supplierName="' . $database->escape($this->supplierName) . '"';
				$field[] = 'lotteryId="' . $database->escape($lotteryId) . '"';
				$field[] = 'lotteryName="' . $database->escape($lotteryName) . '"';
				$field[] = 'unit="' . $database->escape($betUnits) . '"';
				$field[] = 'multiple="' . $database->escape($multiple) . '"';
				$field[] = 'amount="' . $database->escape($betMoney*100) . '"';
				$field[] = 'issue="' . $database->escape($issue) . '"';
				$field[] = 'append="' . $database->escape($ticketAppend) . '"';
				$field[] = 'betType="' . $database->escape($betType) . '"';
				$field[] = 'betContent="' . $database->escape($betContent) . '"';
				$field[] = 'createTime=now()';
				$sqlArr[] = 'insert into t_ticket set ' . implode(',', $field);
				$insertDataArr[] = array('ticketLotteryId' => $ticketLotteryId, 'betType' => $betType, 'betUnits' => $betUnits, 'multiple' => $multiple, 'betMoney' => $betMoney, 'append' => $ticketAppend, 'betContent' => $betContent);
			}
		}
		if ($ticketUnit != $countTicketUnit) {
			$database->close();
			$resp->msg = '订单注数和赛事注数不符';
			return $resp;
		}
		if ($countAmount != $amount) {
			$database->close();
			$resp->msg = '出票总额和订单金额不符';
			return $resp;
		}
		if (count($sqlArr) <= 0) {
			$database->close();
			$resp->msg = '插入票sql为空';
			return $resp;
		}
		if ($database->execute('start transaction')) {
			$sql = implode(';', $sqlArr);
			$result = $database->multiExecute($sql);
			if (!$result) {
				$database->execute('rollback');
				$database->close();
				$resp->msg = '出票状态sql执行异常';
				return $resp;
			}
			$ticketIdArr = $database->multiInsertId();
			if (count($insertDataArr) != count($ticketIdArr)) {
				$database->execute('rollback');
				$database->close();
				$resp->msg = '出票插入执行异常';
				return $resp;
			}
			$ticketNum = 0;
			$bodyArr = array();
			$countNum = 0;
			$countMoney = 0;
			$countTicket = array();
			for ($i = 0, $length = count($ticketIdArr); $i < $length; $i++) {
				$ticketId = (int)$ticketIdArr[$i];
				if ($ticketId <= 0) {
					$database->execute('rollback');
					$database->close();
					$resp->msg = '出票id生成异常';
					return $resp;
				}
				$ticketLotteryId = trim($insertDataArr[$i]['ticketLotteryId']);
				$betType = trim($insertDataArr[$i]['betType']);
				$betUnits = (int)$insertDataArr[$i]['betUnits'];
				$multiple = (int)$insertDataArr[$i]['multiple'];
				$betMoney = (int)$insertDataArr[$i]['betMoney'];
				$betContent = trim($insertDataArr[$i]['betContent']);
				$append = (int)$insertDataArr[$i]['append'];
				$countNum++;
				$countMoney += $betMoney;
				$countTicket[] = '<ticket ticketId="'.$ticketId.'" betType="'.$betType.'" issueNumber="'.$issue.'" betUnits="'.$betUnits.'" multiple="'.$multiple.'" betMoney="'.$betMoney.'" isAppend="'.$append.'"><betContent>'.$betContent.'</betContent></ticket>';
				//彩票订单的数量，最多不能超过50张票
				if ($i == ($length - 1) || $countNum == 50) {
					$ticketNum += $countNum;
					$body = array();
					$body[] = '<ticketorder lotteryId="'.$ticketLotteryId.'" ticketsnum="'.$countNum.'" totalmoney="'.$countMoney.'">';
					$body[] = '<tickets>'.implode('', $countTicket).'</tickets>';
					$body[] = '</ticketorder>';
					$bodyArr[] = implode('', $body);
					$countNum = 0;
					$countMoney = 0;
					$countTicket = array();
				}
			}
			if (count($ticketIdArr) != $ticketNum) {
				$database->execute('rollback');
				$database->close();
				$resp->msg = '插入票和请求出票数量不符';
				return $resp;
			}
			//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
			//更新订单状态
			$updateOrderSql = 'update t_order set ticketStatus=7 where orderId="' . $orderId . '" and orderType=7 and status=2 and ticketStatus=0 limit 1 ';
			$updateOrderResult = $database->execute($updateOrderSql);
			$updateOrderAffectedRows = (int)$database->getAffectedRows();
			if (!$updateOrderResult || $updateOrderAffectedRows <= 0) {
				$database->execute('rollback');
				$database->close();
				$resp->msg = '更新订单出票状态失败';
				return $resp;
			}
			$database->execute('commit');
			$database->close();
			foreach ($bodyArr as $body) {
				$this->request('002', $body);
			}
			$resp->errCode = 0;
			$resp->msg = '成功';
			return $resp;
		} else {
			$resp->msg = '出票事物异常';
			return $resp;
		}
	}

	//查询票状态
	public function digitalTicketStatus() {
		$resp = requireModule('Resp');
		$param = array();
		$param['supplierId'] = $this->supplierId;
		$param['status'] = 0;//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已撤单
		$param['needDigital'] = true;
		$param['justCount'] = true;
		$selectTicketResp = $this->ticketService->selectTicket($param);
		if ($selectTicketResp->errCode != 0) {
			$resp->msg = '票查询异常';
			return $resp;
		}
		$data = $selectTicketResp->data;
		$totalCount = (int)$data['totalCount'];
		$pageSum = (int)ceil($totalCount/50);
		if ($totalCount <= 0 || $pageSum <= 0) {
			$resp->msg = '不存在需要设置状态的票';
			return $resp;
		}
		for ($i = 1; $i <= $pageSum; $i++) {
			$this->doDigitalTicketStatus($i);
		}
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	//查询票状态
	private function doDigitalTicketStatus($pageNum) {
		$resp = requireModule('Resp');
		$pageNum = (int)$pageNum;
		if ($pageNum <= 0) {
			$resp->msg = '票页码异常';
			return $resp;
		}
		$param = array();
		$param['supplierId'] = $this->supplierId;
		$param['status'] = 0;//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已撤单
		$param['needDigital'] = true;
		$param['orderBy'] = 1;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = 50;//一次可以查询50张票,只能查询7天之内的数据
		$selectTicketResp = $this->ticketService->selectTicket($param);
		if ($selectTicketResp->errCode != 0) {
			$resp->msg = '票查询异常';
			return $resp;
		}
		$ticketList = $selectTicketResp->data['list'];
		$orderIdArr = array();
		$tickets = array();
		$ticketMap = array();
		foreach ($ticketList as $ticket) {
			$orderId = (int)$ticket['orderId'];
			$ticketId = (int)$ticket['ticketId'];
			$status = (int)$ticket['status'];
			if ($orderId <= 0 || $ticketId <= 0 || $status != 0) {
				continue;
			}
			$orderIdArr[] = $orderId;
			$tickets[] = '<queryticket ticketId="'.$ticketId.'" />';
			$ticketMap[$ticketId] = $ticket;
		}
		$orderIdArr = array_unique($orderIdArr);
		if (count($orderIdArr) <= 0 || count($tickets) <= 0 || count($ticketMap) <= 0) {
			$resp->msg = '不存在需要设置状态的票';
			return $resp;
		}
		$param = array();
		$param['orderId'] = $orderIdArr;
		$param['orderType'] = 7;//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=竞彩出票订单, 4=彩金充值订单, 5=晒米冷热订单, 6=极限追盘订单, 7=数字彩出票订单
		$param['status'] = 2; //订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
		$param['ticketSupplierId'] = $this->supplierId;//出票供应商
		$param['pageNum'] = 1;
		$param['pageSize'] = 50;
		$selectOrderResp = $this->orderService->selectOrder($param);
		if ($selectOrderResp->errCode != 0) {
			$resp->msg = '订单查询异常';
			return $resp;
		}
		$orderList = $selectOrderResp->data['list'];
		$orderMap = array();
		foreach ($orderList as $order) {
			$orderId = (int)$order['orderId'];
			if ($orderId > 0) {
				$orderMap[$orderId] = $order;
			}
		}
		if (count($orderMap) <= 0) {
			$resp->msg = '票订单查询异常';
			return $resp;
		}
		$body = implode('', $tickets);
		$requestResp = $this->request('003', $body);
		if ($requestResp->errCode != 0 || empty($requestResp->data)) {
			$resp->msg = '出票请求有误';
			return $resp;
		}
		$xml = $requestResp->data;
		$ticketSqlArr = array();
		$setOrderIdArr = array();
		$database = requireModule("Database");
		foreach ($xml->children() as $child1) {
			$nodeName1 = trim($child1->getName());
			if ($nodeName1 != 'body') {
				continue;
			}
			foreach ($child1->children() as $child2) {
				$nodeName2 = trim($child2->getName());
				if ($nodeName2 != 'ticketresult') {
					continue;
				}
				$ticketId = (int)$child2['ticketId'];
				$platformId = trim($child2['palmId']);
				$statusCode = trim($child2['statusCode']);
				$printNo = trim($child2['printNo']);
				$printTime = trim($child2['PrintOutTime']);
				$ticket = $ticketMap[$ticketId];
				$ticketCreateTime = strtotime(trim($ticket['createTime']));
				$orderId = (int)$ticket['orderId'];
				$order = $orderMap[$orderId];
				//statusCode, 000=订单不存在, 001=等待交易, 002=交易中, 003=交易成功, 004=交易失败
				if ($ticketId <= 0 || empty($ticket) || $orderId <= 0 || empty($order) || ($statusCode != '000' && $statusCode != '003' && $statusCode != '004')) {
					continue;
				}
				$status = 0;//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已撤单
				if ($statusCode == '003') {
					$status = 2;
				} else if ($statusCode == '004') {
					$status = 1;
				} else if ($statusCode == '000' && (time()-$ticketCreateTime) > 60) {//防止出票商集群服务器不同步产生"不存在"异常
					$status = 1;
				}
				//添加更新票信息
				$ticketField = array();
				$ticketField[] = 'status="' . $database->escape($status) . '"';
				$ticketField[] = 'platformId="' . $database->escape($platformId) . '"';
				$ticketField[] = 'printNo="' . $database->escape($printNo) . '"';
				$ticketField[] = 'printTime="' . $database->escape($printTime) . '"';
				$setOrderIdArr[] = $orderId;
				$ticketSqlArr[] = 'update t_ticket set ' . implode(',', $ticketField) . ' where ticketId="' . $ticketId . '" and status=0 limit 1';
			}
		}
		$setOrderIdArr = array_unique($setOrderIdArr);
		$sqlArr = array_unique($ticketSqlArr);
		if (count($sqlArr) <= 0) {
			$database->close();
			$resp->msg = '执行数组异常';
			return $resp;
		}
		$sql = implode(';', $sqlArr);
		$result = $database->multiExecute($sql);
		$database->multiFree();
		if (!$result) {
			$database->close();
			$resp->msg = '出票状态sql执行异常';
			return $resp;
		}
		$database->close();
		if (count($setOrderIdArr) > 0) {
			$message = requireModule('Message');
			foreach ($setOrderIdArr as $orderId) {
				$message->publish('orderTicketStatus', $orderId);
			}
		}
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	//票状态通知
	public function digitalTicketStatusNotify($ticketresults, $orderIdArr, $ticketMap) {
		$resp = requireModule('Resp');
		$orderIdArr = $this->common->filterIdArray($orderIdArr);
		if (!is_array($ticketresults) || count($ticketresults) <= 0 || !is_array($orderIdArr) || count($orderIdArr) <= 0 || !is_array($ticketMap) || count($ticketMap) <= 0) {
			$resp->msg = '参数异常';
			return $resp;
		}
		$param = array();
		$param['orderId'] = $orderIdArr;
		$param['orderType'] = 7;//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=竞彩出票订单, 4=彩金充值订单, 5=晒米冷热订单, 6=极限追盘订单, 7=数字彩出票订单
		$param['status'] = 2; //订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
		$param['ticketSupplierId'] = $this->supplierId;//出票供应商
		$param['pageNum'] = 1;
		$param['pageSize'] = 50;
		$selectOrderResp = $this->orderService->selectOrder($param);
		if ($selectOrderResp->errCode != 0) {
			$resp->msg = '订单查询异常';
			return $resp;
		}
		$orderList = $selectOrderResp->data['list'];
		$orderMap = array();
		foreach ($orderList as $order) {
			$orderId = (int)$order['orderId'];
			if ($orderId > 0) {
				$orderMap[$orderId] = $order;
			}
		}
		if (count($orderMap) <= 0) {
			$resp->msg = '票订单查询异常';
			return $resp;
		}
		$ticketSqlArr = array();
		$ticketReturnArr = array();
		$setOrderIdArr = array();
		$database = requireModule("Database");
		foreach ($ticketresults as $ticketresult) {
			$ticketId = (int)$ticketresult['ticketId'];
			$platformId = trim($ticketresult['palmId']);
			$statusCode = trim($ticketresult['statusCode']);
			$printNo = trim($ticketresult['printNo']);
			$printTime = trim($ticketresult['PrintOutTime']);
			$ticket = $ticketMap[$ticketId];
			$orderId = (int)$ticket['orderId'];
			$order = $orderMap[$orderId];
			//statusCode, 000=订单不存在, 001=等待交易, 002=交易中, 003=交易成功, 004=交易失败
			if ($ticketId <= 0 || empty($ticket) || $orderId <= 0 || empty($order) || empty($platformId) || ($statusCode != '003' && $statusCode != '004')) {
				continue;
			}
			$status = 0;//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已撤单
			if ($statusCode == '003') {
				$status = 2;
			} else if ($statusCode == '004') {
				$status = 1;
			}
			//添加更新票信息
			$ticketField = array();
			$ticketField[] = 'status="' . $database->escape($status) . '"';
			$ticketField[] = 'platformId="' . $database->escape($platformId) . '"';
			$ticketField[] = 'printNo="' . $database->escape($printNo) . '"';
			$ticketField[] = 'printTime="' . $database->escape($printTime) . '"';
			$ticketReturnArr[] = '<returnticketresult lotteryId="'.$ticketId.'" palmId="'.$platformId.'"/>';
			$setOrderIdArr[] = $orderId;
			//放在这里是因为等待上面更新"赔率"和"让球或让分"
			$ticketSqlArr[] = 'update t_ticket set ' . implode(',', $ticketField) . ' where ticketId="' . $ticketId . '" and status=0 limit 1';
		}
		$ticketReturnArr = array_unique($ticketReturnArr);
		$setOrderIdArr = array_unique($setOrderIdArr);
		$sqlArr = array_unique($ticketSqlArr);
		if (count($sqlArr) <= 0 || count($ticketReturnArr) <= 0) {
			$database->close();
			$resp->msg = '执行数组异常';
			return $resp;
		}
		$sql = implode(';', $sqlArr);
		$result = $database->multiExecute($sql);
		$database->multiFree();
		if (!$result) {
			$database->close();
			$resp->msg = '出票状态sql执行异常';
			return $resp;
		}
		$database->close();
		if (count($setOrderIdArr) > 0) {
			$message = requireModule('Message');
			foreach ($setOrderIdArr as $orderId) {
				$message->publish('orderTicketStatus', $orderId);
			}
		}
		$resp->data = $ticketReturnArr;
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	//查询票算奖
	public function digitalTicketPrize() {
		$resp = requireModule('Resp');
		$param = array();
		$param['supplierId'] = $this->supplierId;
		$param['hasPlatformId'] = true;
		$param['status'] = array(1,2);//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已撤单
		$param['needDigital'] = true;
		$param['justCount'] = true;
		$selectTicketResp = $this->ticketService->selectTicket($param);
		if ($selectTicketResp->errCode != 0) {
			$resp->msg = '票查询异常';
			return $resp;
		}
		$data = $selectTicketResp->data;
		$totalCount = (int)$data['totalCount'];
		$pageSum = (int)ceil($totalCount/20);
		if ($totalCount <= 0 || $pageSum <= 0) {
			$resp->msg = '不存在需要算奖的票';
			return $resp;
		}
		for ($i = 1; $i <= $pageSum; $i++) {
			$this->doDigitalTicketPrize($i);
		}
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	//查询票算奖
	private function doDigitalTicketPrize($pageNum) {
		$resp = requireModule('Resp');
		$pageNum = (int)$pageNum;
		if ($pageNum <= 0) {
			$resp->msg = '票页码异常';
			return $resp;
		}
		$param = array();
		$param['supplierId'] = $this->supplierId;
		$param['hasPlatformId'] = true;
		$param['status'] = array(1,2);//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已撤单
		$param['needDigital'] = true;
		$param['orderBy'] = 1;
		$param['pageNum'] = $pageNum;
		$param['pageSize'] = 20;//一次最多20个查询
		$selectTicketResp = $this->ticketService->selectTicket($param);
		if ($selectTicketResp->errCode != 0) {
			$resp->msg = '票查询异常';
			return $resp;
		}
		$ticketList = $selectTicketResp->data['list'];
		$tickets = array();
		$ticketMap = array();
		foreach ($ticketList as $ticket) {
			$orderId = (int)$ticket['orderId'];
			$ticketId = (int)$ticket['ticketId'];
			$status = (int)$ticket['status'];
			if ($orderId <= 0 || $ticketId <= 0 || ($status != 1 && $status != 2)) {
				continue;
			}
			$tickets[] = '<queryprize TicketId="'.$ticketId.'" />';
			$ticketMap[$ticketId] = $ticket;
		}
		if (count($tickets) <= 0 || count($ticketMap) <= 0) {
			$resp->msg = '不存在需要算奖的票';
			return $resp;
		}
		$body = implode('', $tickets);
		$requestResp = $this->request('011', $body);
		if ($requestResp->errCode != 0 || empty($requestResp->data)) {
			$resp->msg = '出票算奖请求有误';
			return $resp;
		}
		$xml = $requestResp->data;
		$setOrderIdArr = array();
		$sqlArr = array();
		$database = requireModule("Database");
		$wonticketsNode = null;
		foreach ($xml->children() as $child1) {
			$nodeName1 = trim($child1->getName());
			if ($nodeName1 != 'body') {
				continue;
			}
			foreach ($child1->children() as $child2) {
				$nodeName2 = trim($child2->getName());
				if ($nodeName2 == 'wontickets') {
					$wonticketsNode = $child2;
					break;
				}
			}
		}
		if ($wonticketsNode == null) {
			$resp->msg = '出票算奖请求有误';
			return $resp;
		}
		foreach ($wonticketsNode->children() as $wonticket) {
			$ticketId = (int)$wonticket['ticketId'];
			$platformId = trim($wonticket['palmId']);
			$state = trim($wonticket['state']);//0=撤单, 1=未开奖, 2=已中奖(包含未派奖和派奖), 3=未中奖, 4=订单不存在
			$prizeAmount = trim($wonticket['prize']) * 100;//税后奖金
			$pretaxPrizeAmount = trim($wonticket['pretaxPrice']) * 100;//税前奖金
			$ticket = $ticketMap[$ticketId];
			$orderId = (int)$ticket['orderId'];
			$status = (int)$ticket['status'];//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已撤单
			if ($ticketId <= 0 || empty($platformId) || empty($ticket) || $orderId <= 0 || ($status != 1 && $status != 2)) {
				continue;
			}
			$tStatus = null;//等待设置的票状态
			if ($status == 1) {
				if ($state == 0) {
					$tStatus = 5;
				}
			} else if ($status == 2) {
				if ($state == 2) {
					$tStatus = 4;
				} else if ($state == 3) {
					$tStatus = 3;
				}
			}
			if ($tStatus === null) {
				continue;
			}
			$setOrderIdArr[] = $orderId;
			$field = array();
			$field[] = 'status="' . $database->escape($tStatus) . '"';
			if ($status == 2 && $state == 2 && $tStatus == 4 && $prizeAmount > 0 && $pretaxPrizeAmount > 0) {
				$field[] = 'prizeAmount="' . $database->escape($prizeAmount) . '"';
				$field[] = 'pretaxPrizeAmount="' . $database->escape($pretaxPrizeAmount) . '"';
			}
			$sqlArr[] = 'update t_ticket set ' . implode(',', $field) . ' where ticketId="' . $ticketId . '" and platformId="'.$database->escape($platformId).'" and status="'.$database->escape($status).'" limit 1';
		}
		$setOrderIdArr = array_unique($setOrderIdArr);
		$sqlArr = array_unique($sqlArr);
		if (count($sqlArr) > 0) {
			$sql = implode(';', $sqlArr);
			$result = $database->multiExecute($sql);
			$database->multiFree();
			if (!$result) {
				$database->close();
				$resp->msg = '出票算奖sql执行异常';
				return $resp;
			}
		}
		$database->close();
		if (count($setOrderIdArr) > 0) {
			$message = requireModule('Message');
			foreach ($setOrderIdArr as $orderId) {
				$message->publish('orderTicketPrize', $orderId);
			}
		}
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

    //查询数字彩赛果
    public function digitalTicketResult($lotteryId) {
        $resp = requireModule('Resp');
		if (empty($lotteryId)) {
			$resp->msg = 'lotteryId不能为空';
			return $resp;
		}
		$lottery = $this->lotteryMap[$lotteryId];
		$lotteryName = trim($lottery['lotteryName']);
		$ticketLotteryId = trim($lottery['ticketLotteryId']);
		if (empty($lottery) || empty($ticketLotteryId)) {
			$resp->msg = '出票商彩种映射异常';
			return $resp;
		}
        $param = array();
        $param['lotteryId'] = $lotteryId;
		$param['status'] = 3;//1=等待销售, 2=正在销售, 3=截止销售未开奖, 4=截止销售已开奖
        $param['pageNum'] = 1;
        $param['pageSize'] = 100;
        $selectLotteryIssueResp = $this->lotteryService->selectLotteryIssue($param);
        if ($selectLotteryIssueResp->errCode != 0) {
            $resp->msg = '票查询异常';
            return $resp;
        }
		$lotteryIssueList = $selectLotteryIssueResp->data['list'];
		if (!is_array($lotteryIssueList) || count($lotteryIssueList) <= 0) {
			$resp->msg = '不存在需要设置的开奖号码';
			return $resp;
		}
		$database = requireModule("Database");
		$sqlArr = array();
		foreach ($lotteryIssueList as $lotteryIssue) {
			$rowKey = trim($lotteryIssue['rowKey']);
			$issue = trim($lotteryIssue['issue']);
			$drawNumber = trim($lotteryIssue['drawNumber']);
			if (empty($rowKey) || empty($issue) || !empty($drawNumber)) {
				continue;
			}
			$content = '<queryresult lotteryId="'.$ticketLotteryId.'" issueNumber="'.$issue.'" />';
			$requestResp = $this->request('010', $content);
			if ($requestResp->errCode != 0 || empty($requestResp->data)) {
				$resp->msg = '出票请求有误';
				return $resp;
			}
			$xml = $requestResp->data;
			$body = $xml->children()->body;
			if (empty($body)) {
				continue;
			}
			$results = $body->children()->results;
			$xmlLotteryId = trim($results['lotteryId']);
			$xmlIssue = trim($results['issueNumber']);
			$xmlValue = trim($results->result['value']);
			if (empty($results) || empty($xmlLotteryId) || empty($xmlIssue) || empty($xmlValue)) {
				continue;
			}
			$drawNumber = null;
			if ($xmlLotteryId == 'SSQ') {
				if (!preg_match('/^\d{2},\d{2},\d{2},\d{2},\d{2},\d{2} \| \d{2}$/', $xmlValue)) {
					$this->common->logger->info($lotteryName.'出票商开奖号码异常('.$issue.'): '.$xmlValue);
					continue;
				}
				$drawNumber = preg_replace("/ /", "", $xmlValue);
				$verifyDigitalBetContentResp = $this->commonService->verifyDigitalBetContent($lotteryId, $drawNumber);
				if ($verifyDigitalBetContentResp->errCode != 0) {
					$this->common->logger->info($lotteryName.'出票商开奖号码异常('.$issue.'): '.$xmlValue);
					continue;
				}
			} else if ($xmlLotteryId == 'DLT') {
				if (!preg_match('/^\d{2},\d{2},\d{2},\d{2},\d{2} \+ \d{2},\d{2}$/', $xmlValue)) {
					$this->common->logger->info($lotteryName.'出票商开奖号码异常('.$issue.'): '.$xmlValue);
					continue;
				}
				$drawNumber = preg_replace("/ /", "", $xmlValue);
				$verifyDigitalBetContentResp = $this->commonService->verifyDigitalBetContent($lotteryId, $drawNumber);
				if ($verifyDigitalBetContentResp->errCode != 0) {
					$this->common->logger->info($lotteryName.'出票商开奖号码异常('.$issue.'): '.$xmlValue);
					continue;
				}
			} else if ($xmlLotteryId == 'JSK3') {
				if (!preg_match('/^\d \d \d$/', $xmlValue)) {
					$this->common->logger->info($lotteryName.'出票商开奖号码异常('.$issue.'): '.$xmlValue);
					continue;
				}
				$drawNumber = preg_replace("/ /", ",", $xmlValue);
				$verifyDigitalBetContentResp = $this->commonService->verifyDigitalBetContent($lotteryId, 'DRAW:'.$drawNumber);
				if ($verifyDigitalBetContentResp->errCode != 0) {
					$this->common->logger->info($lotteryName.'出票商开奖号码异常('.$issue.'): '.$xmlValue);
					continue;
				}
			} else if ($xmlLotteryId == 'GX11X5') {
				if (!preg_match('/^\d{2} \d{2} \d{2} \d{2} \d{2}$/', $xmlValue)) {
					$this->common->logger->info($lotteryName.'出票商开奖号码异常('.$issue.'): '.$xmlValue);
					continue;
				}
				$drawNumber = preg_replace("/ /", ",", $xmlValue);
				$verifyDigitalBetContentResp = $this->commonService->verifyDigitalBetContent($lotteryId, 'DRAW:'.$drawNumber);
				if ($verifyDigitalBetContentResp->errCode != 0) {
					$this->common->logger->info($lotteryName.'出票商开奖号码异常('.$issue.'): '.$xmlValue);
					continue;
				}
			}
			if (!empty($drawNumber)) {
				$sqlArr[] = 'update t_lottery_issue set drawNumber="'.$drawNumber.'" where lotteryId="'.$lotteryId.'" and issue="'.$issue.'" and drawNumber="" limit 1';
			}
		}
		if (count($sqlArr) > 0) {
			$sql = implode(';', $sqlArr);
			$result = $database->multiExecute($sql);
			$database->multiFree();
			if ($result) {
				$this->common->logger->info($lotteryName.'出票商开奖号码更新成功');
				$orderType = 7;
				$message = requireModule('Message');
				$message->publish('orderResult', $orderType);
			} else {
				$this->common->logger->info($lotteryName.'出票商开奖号码更新失败');
			}
		}
		$database->close();
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
    }

    //票中奖通知
	public function digitalTicketPrizeNotify($wonticketsNode, $ticketMap) {
		$resp = requireModule('Resp');
		if (!is_array($wonticketsNode) || count($wonticketsNode) <= 0 || !is_array($ticketMap) || count($ticketMap) <= 0) {
			$resp->msg = '参数异常';
			return $resp;
		}
		$ticketReturnArr = array();
		$setOrderIdArr = array();
		$sqlArr = array();
		$database = requireModule("Database");
		foreach ($wonticketsNode as $wonticket) {
			$ticketId = (int)$wonticket['ticketId'];
			$platformId = trim($wonticket['palmId']);
			$state = trim($wonticket['state']);//2:已结算
			$prizeAmount = trim($wonticket['prize']) * 100;//税后奖金
			$pretaxPrizeAmount = trim($wonticket['pretaxPrice']) * 100;//税前奖金
			$ticket = $ticketMap[$ticketId];
			$orderId = (int)$ticket['orderId'];
			$status = (int)$ticket['status'];//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已撤单
			if ($ticketId <= 0 || empty($platformId) || $state != 2 || $prizeAmount <= 0 || $pretaxPrizeAmount <= 0 || empty($ticket) || $orderId <= 0 || $status != 2) {
				continue;
			}
			$ticketReturnArr[] = '<returnwonticket lotteryId="'.$ticketId.'" palmId="'.$platformId.'"/>';
			$setOrderIdArr[] = $orderId;
			$tStatus = 4;
			$field = array();
			$field[] = 'status="' . $database->escape($tStatus) . '"';
			$field[] = 'prizeAmount="' . $database->escape($prizeAmount) . '"';
			$field[] = 'pretaxPrizeAmount="' . $database->escape($pretaxPrizeAmount) . '"';
			$sqlArr[] = 'update t_ticket set ' . implode(',', $field) . ' where ticketId="' . $ticketId . '" and platformId="'.$database->escape($platformId).'" and status="'.$database->escape($status).'" limit 1';
		}
		$ticketReturnArr = array_unique($ticketReturnArr);
		$setOrderIdArr = array_unique($setOrderIdArr);
		$sqlArr = array_unique($sqlArr);
		if (count($sqlArr) > 0) {
			$sql = implode(';', $sqlArr);
			$result = $database->multiExecute($sql);
			$database->multiFree();
			if (!$result) {
				$database->close();
				$resp->msg = '出票算奖sql执行异常';
				return $resp;
			}
		}
		$database->close();
		if (count($setOrderIdArr) > 0) {
			$message = requireModule('Message');
			foreach ($setOrderIdArr as $orderId) {
				$message->publish('orderTicketPrize', $orderId);
			}
		}
		$resp->data = $ticketReturnArr;
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	public function formatBetContent($lotteryId, $betContent) {
		$resp = requireModule('Resp');
		$lotteryId = trim($lotteryId);
		$betContent = trim($betContent);
		if (empty($lotteryId)) {
			$resp->msg = '彩种id有误';
			return $resp;
		}
		//empty($betContent)会出错，因为在福彩3D的ZXHZ的时候$betContent可以是0
		if ($lotteryId != 'FC3D') {
			if (empty($betContent)) {
				$resp->msg = '投注格式有误';
				return $resp;
			}
		}
		if ($lotteryId == 'SSQ') {
			return $this->formatSsqBetContent($betContent);
		} else if ($lotteryId == 'JSK3') {
			return $this->formatJsk3BetContent($betContent);
		} else if ($lotteryId == 'DLT') {
			return $this->formatDltBetContent($betContent);
		} else if ($lotteryId == 'GX11X5') {
            return $this->formatGx11x5BetContent($betContent);
        } else if ($lotteryId == 'FC3D') {
			return $this->formatFc3dBetContent($betContent);
		} else {
			$resp->msg = '不支持该彩种';
			return $resp;
		}
	}

	public function formatSsqBetContent($betContent) {
		$resp = requireModule('Resp');
		$betContent = trim($betContent);
		if (empty($betContent)) {
			$resp->msg = '双色球投注格式有误';
			return $resp;
		}
		$arr = explode('|', $betContent);
		if (!is_array($arr) || count($arr) != 2) {
			$resp->msg = '双色球投注格式有误';
			return $resp;
		}
		$redArr = explode(',', $arr[0]);
		$blueArr = explode(',', $arr[1]);
		$redLength = count($redArr);
		$blueLength = count($blueArr);
		if ($redLength < 6 || $blueLength < 1) {
			$resp->msg = '双色球投注格式有误';
			return $resp;
		}
		$data = null;
		if ($redLength == 6 && $blueLength == 1) {
			$data = array('betType' => 'DS', 'betContent' => $betContent);
		} else if ($redLength > 6 || $blueLength > 1) {
			$data = array('betType' => 'FS', 'betContent' => $betContent);
		}
		if (empty($data)) {
			$resp->msg = '双色球投注格式转换异常';
			return $resp;
		}
		$resp->data = $data;
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

    public function formatJsk3BetContent($betContent) {
        $resp = requireModule('Resp');
		$betContent = trim($betContent);
		if (empty($betContent)) {
			$resp->msg = '江苏快3投注格式有误';
			return $resp;
		}
		$data = null;
		if (preg_match('/^2TDX:([1-6])\1#([1-6])$/', $betContent, $temp) && is_array($temp) && count($temp) == 3) {
			//二同号单选：2TDX:22#1  ->  2TDX:2,2,1
			$arr = array($temp[1], $temp[1], $temp[2]);
			sort($arr);
			$data = array('betType' => '2TDX', 'betContent' => implode(',', $arr));
		} else if (preg_match('/^2TFX:([1-6])\1\*$/', $betContent, $temp) && is_array($temp) && count($temp) == 2) {
			//二同号复选：2TFX:11*  ->  2TFX:11*
			$data = array('betType' => '2TFX', 'betContent' => $temp[1].$temp[1].'*');
		} else if (preg_match('/^2BT:([1-6]),([1-6])$/', $betContent, $temp) && is_array($temp) && count($temp) == 3) {
			//二不同号：2BT:1,2  ->  2BTDS:12
			$arr = array($temp[1], $temp[2]);
			sort($arr);
			$data = array('betType' => '2BTDS', 'betContent' => implode('', $arr));
		} else if (preg_match('/^3TDX:([1-6])\1{2}$/', $betContent, $temp) && is_array($temp) && count($temp) == 2) {
			//三同号单选：3TDX:111  ->  3TDX:1,1,1
			$data = array('betType' => '3TDX', 'betContent' => $temp[1].','.$temp[1].','.$temp[1]);
		} else if ($betContent == '3TTX:777') {
			//三同号通选：3TTX:777  ->  3TTX:7,7,7
			$data = array('betType' => '3TTX', 'betContent' => '7,7,7');
		} else if ($betContent == '3LTX:789') {
			//三连号通选：3LTX:789  ->  3LTX:7,8,9
			$data = array('betType' => '3LTX', 'betContent' => '7,8,9');
		} else if (preg_match('/^3BT:([1-6]),([1-6]),([1-6])$/', $betContent, $temp) && is_array($temp) && count($temp) == 4) {
			//三不同号：3BT:1,2,3  ->  3BTDS:1,2,3
			$arr = array($temp[1], $temp[2], $temp[3]);
			sort($arr);
			$data = array('betType' => '3BTDS', 'betContent' => implode(',', $arr));
		} else if (preg_match('/^HZ:([3-9]|1[0-8])$/', $betContent, $temp) && is_array($temp) && count($temp) == 2) {
			//和值：HZ:3  ->  HZ:3
			if ($temp[1] == 3) {
				$data = array('betType' => '3TDX', 'betContent' => '1,1,1');
			} else if ($temp[1] == 18) {
				$data = array('betType' => '3TDX', 'betContent' => '6,6,6');
			} else {
				$data = array('betType' => 'HZ', 'betContent' => $temp[1]);
			}
		}
		if (empty($data)) {
			$resp->msg = '江苏快3投注格式转换异常';
			return $resp;
		}
        $resp->data = $data;
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }

	public function formatDltBetContent($betContent) {
		$resp = requireModule('Resp');
		$betContent = trim($betContent);
		if (empty($betContent)) {
			$resp->msg = '大乐透投注格式有误';
			return $resp;
		}
		$arr = explode('+', $betContent);
		if (!is_array($arr) || count($arr) != 2) {
			$resp->msg = '大乐透投注格式有误';
			return $resp;
		}
		$redArr = explode(',', $arr[0]);
		$blueArr = explode(',', $arr[1]);
		$redLength = count($redArr);
		$blueLength = count($blueArr);
		if ($redLength < 5 || $blueLength < 2) {
			$resp->msg = '大乐透投注格式有误';
			return $resp;
		}
		$data = null;
		if ($redLength == 5 && $blueLength == 2) {
			$data = array('betType' => 'DS', 'betContent' => $betContent);
		} else if ($redLength > 5 || $blueLength > 2) {
			$data = array('betType' => 'FS', 'betContent' => $betContent);
		}
		if (empty($data)) {
			$resp->msg = '大乐透投注格式转换异常';
			return $resp;
		}
		$resp->data = $data;
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	public function formatGx11x5BetContent($betContent) {
		$resp = requireModule('Resp');
		$betContent = trim($betContent);
		if (empty($betContent)) {
			$resp->msg = '广西11选5投注格式有误';
			return $resp;
		}
		/*
			RX2:01,02,03      //任选二
			RX3:01,02,03,04   //任选三
			RX4:01,02,03,04,05   //任选四
			RX5:01,02,03,04,05,06  //任选五
			RX6:01,02,03,04,05,06,07   //任选六
			RX7:01,02,03,04,05,06,07,08   //任选七
			RX8:01,02,03,04,05,06,07,08,09   //任选八
			Q1:01,02,03  //前一
			Q2ZHX:01,02,03|04,05,06   //前二直选
			Q2ZUX:01,02,03,04   //前二组选
			Q3ZHX:01,02,03|04,05,06|07,08,09   //前三直选
			Q3ZUX:01,02,03,04,05,06   //前三组选
		*/
		$data = null;
		if (preg_match('/^RX([2-8]):((?:\d{2},?){2,8})$/', $betContent, $temp) && is_array($temp) && count($temp) == 3) {
			//任选[二-八]：RX[2-8]:01,02...  ->  11_RX[2-8]:01,02...
			$num = (int)$temp[1];
			$arr = explode(',', trim($temp[2]));
			if (count($arr) != $num) {
				$resp->msg = '广西11选5('.$betContent.')投注格式有误';
				return $resp;
			}
			sort($arr);
			$data = array('betType' => '11_RX'.$num, 'betContent' => implode(',', $arr));
		} else if (preg_match('/^Q1:(\d{2})$/', $betContent, $temp) && is_array($temp) && count($temp) == 2) {
			//前一：Q1:01  ->  11_RX1:01
			$data = array('betType' => '11_RX1', 'betContent' => trim($temp[1]));
		} else if (preg_match('/^Q([2-3])ZHX:((?:\d{2}\|?){2,3})$/', $betContent, $temp) && is_array($temp) && count($temp) == 3) {
			//前[二-三]直选：Q[2-3]ZHX:01|02...  ->  11_ZXQ[2-3]_D:01|02...
			$num = (int)$temp[1];
			$arr = explode('|', trim($temp[2]));
			if (count($arr) != $num) {
				$resp->msg = '广西11选5('.$betContent.')投注格式有误';
				return $resp;
			}
			$data = array('betType' => '11_ZXQ'.$num.'_D', 'betContent' => implode('|', $arr));
		} else if (preg_match('/^Q([2-3])ZUX:((?:\d{2},?){2,3})$/', $betContent, $temp) && is_array($temp) && count($temp) == 3) {
			//前[二-三]组选：Q[2-3]ZUX:01,02...  ->  11_ZXQ[2-3]:01,02
			$num = (int)$temp[1];
			$arr = explode(',', trim($temp[2]));
			if (count($arr) != $num) {
				$resp->msg = '广西11选5('.$betContent.')投注格式有误';
				return $resp;
			}
			sort($arr);
			$data = array('betType' => '11_ZXQ'.$num, 'betContent' => implode(',', $arr));
		}
		if (empty($data)) {
			$resp->msg = '广西11选5投注格式转换异常';
			return $resp;
		}
		$resp->data = $data;
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
    }

	public function formatFc3dBetContent($betContent) {
		$resp = requireModule('Resp');
		$betContent = trim($betContent);
		if (empty($betContent)) {
			$resp->msg = '福彩3D投注格式有误';
			return $resp;
		}
		/*
			ZHX:0,1|1,2,3|4,5,6  //直选
			ZHXHZ:0,1,9,11,27     //直选和值
			ZU3:0,1,2,3,4        //组三
			ZU6:0,1,2,3,4,5,6    //组六
		*/
		$data = null;
		if (preg_match('/^ZHX:((?:\d\|?){3})$/', $betContent, $temp) && is_array($temp) && count($temp) == 2) {
			$data = array('betType' => 'ZXDS', 'betContent' => preg_replace("/\|/", ",", trim($temp[1])));
		} else if (preg_match('/^ZHXHZ:(\d+)$/', $betContent, $temp) && is_array($temp) && count($temp) == 2) {
			$data = array('betType' => 'ZXHZ', 'betContent' => trim($temp[1]));
		} else if (preg_match('/^ZU3:(\d,\d)$/', $betContent, $temp) && is_array($temp) && count($temp) == 2) {
			$arr = explode(',', trim($temp[1]));
			if (count($arr) != 2) {
				$resp->msg = '福彩3D('.$betContent.')投注格式有误';
				return $resp;
			}
			$betArr1 = array($arr[0],$arr[0],$arr[1]);
			$betArr2 = array($arr[0],$arr[1],$arr[1]);
			sort($betArr1);
			sort($betArr2);
			$betArr = array(implode(',', $betArr1), implode(',', $betArr2));
			sort($betArr);
			$data = array('betType' => 'ZX_DS', 'betContent' => implode(';', $betArr));
		} else if (preg_match('/^ZU6:(\d,\d,\d)$/', $betContent, $temp) && is_array($temp) && count($temp) == 2) {
			$data = array('betType' => 'ZX_DS', 'betContent' => trim($temp[1]));
		}
		if (empty($data)) {
			$resp->msg = '福彩3D投注格式转换异常';
			return $resp;
		}
		$resp->data = $data;
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	//分离出平台和出票商之间"最简"的投注格式
	public function separateBetContent($lotteryId, $betType, $betContent) {
		$resp = requireModule('Resp');
		$lotteryId = trim($lotteryId);
		$betType = trim($betType);
		$betContent = trim($betContent);
		if (empty($lotteryId)) {
			$resp->msg = '彩种id有误';
			return $resp;
		}
		if (empty($betType)) {
			$resp->msg = '玩法有误';
			return $resp;
		}
		//empty($betContent)会出错，因为在福彩3D的ZXHZ的时候$betContent可以是0
		if ($lotteryId != 'FC3D') {
			if (empty($betContent)) {
				$resp->msg = '投注格式有误';
				return $resp;
			}
		}
		if ($lotteryId == 'SSQ') {
			return $this->separateSsqBetContent($betType, $betContent);
		} else if ($lotteryId == 'JSK3') {
			return $this->separateJsk3BetContent($betType, $betContent);
		} else if ($lotteryId == 'DLT') {
			return $this->separateDltBetContent($betType, $betContent);
		} else if ($lotteryId == 'GX11X5') {
            return $this->separateGx11x5BetContent($betType, $betContent);
        } else if ($lotteryId == 'FC3D') {
			return $this->separateFc3dBetContent($betType, $betContent);
		} else {
			$resp->msg = '不支持该彩种';
			return $resp;
		}
	}

	public function separateSsqBetContent($betType, $betContent) {
		$resp = requireModule('Resp');
		$betType = trim($betType);
		$betContent = trim($betContent);
		if (empty($betType)) {
			$resp->msg = '双色球玩法有误';
			return $resp;
		}
		if (empty($betContent)) {
			$resp->msg = '双色球投注格式有误';
			return $resp;
		}
		$betContentArr = null;
		if ($betType == 'DS') {
			$betContentArr = explode(';', $betContent);
		} else if ($betType == 'FS') {
			$betContentArr = array($betContent);
		}
		if (!is_array($betContentArr) || count($betContentArr) <= 0) {
			$resp->msg = '双色球投注格式分离异常';
			return $resp;
		}
		$data = array();
		foreach ($betContentArr as $content) {
			$data[] = $betType.':'.$content;
		}
		$resp->data = $data;
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	public function separateJsk3BetContent($betType, $betContent) {
		$resp = requireModule('Resp');
		$betType = trim($betType);
		$betContent = trim($betContent);
		if (empty($betType)) {
			$resp->msg = '江苏快3玩法有误';
			return $resp;
		}
		if (empty($betContent)) {
			$resp->msg = '江苏快3投注格式有误';
			return $resp;
		}
		$betContentArr = null;
		if ($betType == '2TDX' || $betType == '3TDX' || $betType == '3BTDS') {
			$betContentArr = explode(';', $betContent);
		} else if ($betType == '2TFX' || $betType == '2BTFS' || $betType == 'HZFS') {
			$betContentArr = explode(',', $betContent);
		} else if ($betType == '2BTDS' || $betType == '3TTX' || $betType == '3LTX' || $betType == 'HZ') {
			$betContentArr = array($betContent);
		}
		if (!is_array($betContentArr) || count($betContentArr) <= 0) {
			$resp->msg = '江苏快3投注格式分离异常';
			return $resp;
		}
		$data = array();
		foreach ($betContentArr as $content) {
			if ($betType == '2BTFS') {
				$data[] = '2BTDS:'.$content;
			} else if ($betType == 'HZFS') {
				$data[] = 'HZ:'.$content;
			} else {
				$data[] = $betType.':'.$content;
			}
		}
		$resp->data = $data;
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	public function separateDltBetContent($betType, $betContent) {
		$resp = requireModule('Resp');
		$betType = trim($betType);
		$betContent = trim($betContent);
		if (empty($betType)) {
			$resp->msg = '大乐透玩法有误';
			return $resp;
		}
		if (empty($betContent)) {
			$resp->msg = '大乐透投注格式有误';
			return $resp;
		}
		$betContentArr = null;
		if ($betType == 'DS') {
			$betContentArr = explode(';', $betContent);
		} else if ($betType == 'FS') {
			$betContentArr = array($betContent);
		}
		if (!is_array($betContentArr) || count($betContentArr) <= 0) {
			$resp->msg = '大乐透投注格式分离异常';
			return $resp;
		}
		$data = array();
		foreach ($betContentArr as $content) {
			$data[] = $betType.':'.$content;
		}
		$resp->data = $data;
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

    public function separateGx11x5BetContent($betType, $betContent) {
		$resp = requireModule('Resp');
		$betType = trim($betType);
		$betContent = trim($betContent);
		if (empty($betType)) {
			$resp->msg = '广西11选5玩法有误';
			return $resp;
		}
		if (empty($betContent)) {
			$resp->msg = '广西11选5投注格式有误';
			return $resp;
		}
		$betTypeArr = array(
			'11_RX1',
			'11_RX2',
			'11_RX3',
			'11_RX4',
			'11_RX5',
			'11_RX6',
			'11_RX7',
			'11_RX8',
			'11_ZXQ2_D',
			'11_ZXQ3_D',
			'11_ZXQ2',
			'11_ZXQ3'
		);
		$betContentArr = null;
		if (in_array($betType, $betTypeArr)) {
			if ($betType == '11_RX1') {
				$betContentArr = explode(',', $betContent);
			} else {
				$betContentArr = explode(';', $betContent);
			}
		}
		if (!is_array($betContentArr) || count($betContentArr) <= 0) {
			$resp->msg = '江苏快3投注格式分离异常';
			return $resp;
		}
		$data = array();
		foreach ($betContentArr as $content) {
			$data[] = $betType.':'.$content;
		}
		$resp->data = $data;
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
    }

	public function separateFc3dBetContent($betType, $betContent) {
		$resp = requireModule('Resp');
		$betType = trim($betType);
		$betContent = trim($betContent);
		if (empty($betType)) {
			$resp->msg = '福彩3D玩法有误';
			return $resp;
		}
		$betTypeArr = array(
			'ZXDS',
			'ZXHZ',
			'ZX_DS'
		);
		$betContentArr = null;
		if (in_array($betType, $betTypeArr)) {
			if ($betType == 'ZX_DS') {
				$betArr = preg_split('/,|;/', $betContent);
				if (!is_array($betArr) || count($betArr) <= 0) {
					$resp->msg = '投注格式异常';
					return $resp;
				}
				$betArr = array_unique($betArr);
				$betLength = count($betArr);
				if ($betLength == 2) {
					$betContentArr = array($betContent);
				} else {
					$betContentArr = explode(';', $betContent);
				}
			} else {
				$betContentArr = explode(';', $betContent);
			}
		}
		if (!is_array($betContentArr) || count($betContentArr) <= 0) {
			$resp->msg = '福彩3D投注格式分离异常';
			return $resp;
		}
		$data = array();
		foreach ($betContentArr as $content) {
			$data[] = $betType.':'.$content;
		}
		$resp->data = $data;
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	//分离重复
	public function separateDuplicate($lotteryId, $betType, $betContentArr) {
		$resp = requireModule('Resp');
		$lotteryId = trim($lotteryId);
		$betType = trim($betType);
		if (empty($lotteryId)) {
			$resp->msg = '彩种id有误';
			return $resp;
		}
		if (empty($betType)) {
			$resp->msg = $lotteryId.'玩法有误';
			return $resp;
		}
		if (!is_array($betContentArr) || count($betContentArr) <= 0) {
			$resp->msg = $lotteryId.'投注格式数组有误';
			return $resp;
		}
		//因为江苏快3的2TFX，2BTFS，HZFS不允许存在重复内容
		if ($lotteryId == "JSK3") {
			if (!in_array($betType, array('2TFX','2BTFS','HZFS'))) {
				$resp->msg = $lotteryId.'玩法不支持';
				return $resp;
			}
		} else if ($lotteryId == 'GX11X5') {
			if (!in_array($betType, array('11_RX1'))) {
				$resp->msg = $lotteryId.'玩法不支持';
				return $resp;
			}
		}
		$countMap = array();
		foreach ($betContentArr as $item) {
			if (!key_exists($item, $countMap)) {
				$countMap[$item] = 0;
			}
			$countMap[$item]++;
		}
		$groupMap = array();
		foreach ($countMap as $key => $count) {
			if (!key_exists($count, $groupMap)) {
				$groupMap[$count] = array();
			}
			$groupMap[$count][] = $key;
		}
		krsort($groupMap);//按key从大到小排序
		$maxCount = key($groupMap);//取出最大count
		$data = array();
		for ($i = 1; $i <= $maxCount; $i++) {
			$temp = array();
			foreach ($groupMap as $count => $arr) {
				if ($count >= $i) {
					$temp = array_merge($temp, $arr);
				}
			}
			sort($temp);
			$bT = $betType;
			$tU = count($temp);
			if ($lotteryId == "JSK3") {
				if ($tU == 1) {
					if ($bT == 'HZFS') {
						$bT = 'HZ';
					} else if ($bT == '2BTFS') {
						$bT = '2BTDS';
					}
				}
			}
			$data[] = array('betType' => $bT, 'ticketUnit' => $tU, 'betContent' => implode(',', $temp));
		}
		$resp->data = $data;
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

    /*********************************************************************冠亚军和数字彩分割线  **************************************************************************/

    //冠亚军出票
    //定时器查询
    public function guessTicketDeal() {
        $resp = requireModule('Resp');
        $param = array();
        $param['ticketSupplierId'] = $this->supplierId;//出票供应商
        $param['orderType'] = 9;//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=竞彩出票订单, 4=彩金充值订单, 5=晒米冷热订单, 6=极限追盘订单, 7=数字彩出票订单, 8=赠送订单, 9=冠亚军竞猜订单
        $param['status'] = 2; //订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        $param['ticketStatus'] = 0;//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
        $param['pageNum'] = 1;
        $param['pageSize'] = 200;
        $selectOrderResp = $this->orderService->selectOrder($param);
        if ($selectOrderResp->errCode != 0) {
            $resp->msg = '订单查询异常';
            return $resp;
        }
        $orderList = $selectOrderResp->data['list'];
        if (!is_array($orderList) || count($orderList) <= 0) {
            $resp->msg = '不存在需要出的票';
            return $resp;
        }
        $orderList = $this->commonService->setGuessList($orderList);
        for ($i = 0, $length = count($orderList); $i < $length; $i++) {
            $order = $orderList[$i];
            $orderId = (int)$order['orderId'];
            $orderType = (int)$order['orderType'];
            $status = (int)$order['status'];
            $ticketStatus = (int)$order['ticketStatus'];    //'出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票',
            $ticketMultiple = (int)$order['ticketMultiple'];
            $amount = (int)$order['amount'];
            $ticketUnit = (int)$order['ticketUnit'];
            $guessList = $order['guessList'];
            if ($orderId <= 0 || $orderType != 9 || $status != 2 || $ticketStatus != 0 || $ticketMultiple <= 0 || $amount <= 0 || $ticketUnit <= 0 || count($guessList) <= 0 || $ticketUnit != count($guessList)) {
                continue;
            }
            $this->requestGuessTicket($order);
        }
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }

    //redis消息通知出票
    public function orderGuessTicketDeal($orderIdArr) {
        $resp = requireModule('Resp');
        if (count($orderIdArr) <= 0) {
            $resp->msg = 'orderIdArr参数有误';
            return $resp;
        }
        $param = array();
        $param['ticketSupplierId'] = $this->supplierId;//出票供应商
        $param['orderId'] = $orderIdArr;
        $param['orderType'] = 9;//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=出票订单, 9=冠亚军订单
        $param['status'] = 2; //订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        $param['ticketStatus'] = 0;//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
        $param['pageNum'] = 1;
        $param['pageSize'] = 60;
        $selectOrderResp = $this->orderService->selectOrder($param);
        if ($selectOrderResp->errCode != 0) {
            $resp->msg = '订单查询异常';
            return $resp;
        }
        $orderList = $selectOrderResp->data['list'];
        if (!is_array($orderList) || count($orderList) <= 0) {
            $resp->msg = '不存在需要出的票';
            return $resp;
        }
        $orderList = $this->commonService->setGuessList($orderList);
        for ($i = 0, $length = count($orderList); $i < $length; $i++) {
            $order = $orderList[$i];
            $orderId = (int)$order['orderId'];
            $orderType = (int)$order['orderType'];
            $status = (int)$order['status'];
            $ticketStatus = (int)$order['ticketStatus'];
            $ticketMultiple = (int)$order['ticketMultiple'];
            $amount = (int)$order['amount'];
            $ticketUnit = (int)$order['ticketUnit'];
            $guessList = $order['guessList'];
            if ($orderId <= 0 || $orderType != 9 || $status != 2 || $ticketStatus != 0 || $ticketMultiple <= 0 || $amount <= 0 || $ticketUnit <= 0 || count($guessList) <= 0 || $ticketUnit != count($guessList)) {
                continue;
            }
            $this->requestGuessTicket($order);
        }
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }

    //冠亚军出票
    private function requestGuessTicket($order) {
        $resp = requireModule('Resp');
        if (empty($order)) {
            $resp->msg = 'order参数有误';
            return $resp;
        }
        $orderId = (int)$order['orderId'];
        $userId = (int)$order['userId'];
        $nickName = trim($order['nickName']);
        $realName = trim($order['realName']);
        $orderType = (int)$order['orderType'];//9=冠亚军竞猜订单
        $status = (int)$order['status'];
        $ticketStatus = (int)$order['ticketStatus'];//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
        $ticketMultiple = (int)$order['ticketMultiple'];
        $amount = (int)$order['amount'];
        $planMatchRecommend = trim($order['planMatchRecommend']);   //投注内容
        $lotteryId = trim($order['lotteryId']);
        $lotteryName = trim($order['lotteryName']);
        $ticketUnit = (int)$order['ticketUnit'];
        $guessList = $order['guessList'];
        if ($orderId <= 0 || $userId <= 0 || $orderType != 9 || $status != 2 || $ticketStatus != 0 || $ticketMultiple <= 0 || $ticketMultiple > 100000 || $amount <= 0 || empty($planMatchRecommend) || empty($lotteryId) || empty($lotteryName) || $ticketUnit <= 0 || count($guessList) <= 0 || $ticketUnit != count($guessList)) {
            $resp->msg = '订单数据异常';
            return $resp;
        }
        //下单接口一次最大只能出50张票；一张订单可以多张票,因为单票最大99倍。
        $ticketsnum = ceil($ticketMultiple/99);//单张票最大99倍
        if ($ticketsnum <= 0) {
            $this->common->logger->info('订单票数('.$ticketsnum.')异常');
            $resp->msg = '订单票数异常';
            return $resp;
        }
        //出票格式转换
        $lottery = $this->lotteryMap[$lotteryId];
        $ticketLotteryId = trim($lottery['ticketLotteryId']);
        if (empty($lottery) || empty($ticketLotteryId)) {
            $resp->msg = '出票商彩种映射异常';
            return $resp;
        }
        $betContent = array();
        foreach ($guessList as $guess) {
            $number = (int)$guess['number'];
            if ($number <= 0) {
                $resp->msg = '订单数据异常';
                return $resp;
            }
            if ($number < 10) {
                $number = '0'.$number;
            }
            $betContent[] = $number;
        }
        sort($betContent);
        $betContent = array_unique($betContent);
        if (count($betContent) != $ticketUnit) {
            $this->common->logger->info('订单注数异常');
            $resp->msg = '订单异常';
            return $resp;
        }
        $betUnits = $ticketUnit;//注数
        $betContent = implode(',', $betContent);//投注格式：01,02
        $passType = '1x1';//方便t_ticket表的查询
        $countAmount = 0;
        $issue = date("Ymd");
        $insertDataArr = array();
        $sqlArr = array();
        $database = requireModule("Database");
        for ($i = 0; $i < $ticketsnum; $i++) {
            $multiple = 0;
            if ($ticketsnum == 1) {
                $multiple = $ticketMultiple;
            } else if (($i == $ticketsnum - 1) && ($ticketMultiple % 99) != 0) {
                $multiple = (int)($ticketMultiple % 99);
            } else {
                $multiple = 99;
            }
            $betMoney = (int)($multiple*$betUnits*2);
            if ($multiple <= 0 || $betMoney <= 0) {
                $database->close();
                $resp->msg = '出票金额,倍数有误';
                return $resp;
            }
            $countAmount += $betMoney * 100;
            $field = array();
            $field[] = 'orderId="' . $database->escape($orderId) . '"';
            $field[] = 'userId="' . $database->escape($userId) . '"';
            $field[] = 'nickName="' . $database->escape($nickName) . '"';
            $field[] = 'realName="' . $database->escape($realName) . '"';
            $field[] = 'supplierId="' . $database->escape($this->supplierId) . '"';
            $field[] = 'supplierName="' . $database->escape($this->supplierName) . '"';
            $field[] = 'lotteryId="' . $database->escape($lotteryId) . '"';
            $field[] = 'lotteryName="' . $database->escape($lotteryName) . '"';
            $field[] = 'unit="' . $database->escape($betUnits) . '"';
            $field[] = 'multiple="' . $database->escape($multiple) . '"';
            $field[] = 'amount="' . $database->escape($betMoney*100) . '"';
            $field[] = 'issue="' . $database->escape($issue) . '"';
            $field[] = 'passType="' . $database->escape($passType) . '"';
            $field[] = 'betContent="' . $database->escape($betContent) . '"';
            $field[] = 'matchRecommend="' . $database->escape($planMatchRecommend) . '"';
            $field[] = 'createTime=now()';
            $sqlArr[] = 'insert into t_ticket set ' . implode(',', $field);
            $insertDataArr[] = array('ticketLotteryId' => $ticketLotteryId,  'betUnits' => $betUnits, 'multiple' => $multiple, 'betMoney' => $betMoney, 'betContent' => $betContent);
        }
        if ($countAmount != $amount) {
            $database->close();
            $resp->msg = '出票总额和订单金额不符';
            return $resp;
        }
        if (count($sqlArr) <= 0) {
            $database->close();
            $resp->msg = '插入票sql为空';
            return $resp;
        }
        if ($database->execute('start transaction')) {
            $sql = implode(';', $sqlArr);
            $result = $database->multiExecute($sql);
            if (!$result) {
                $database->execute('rollback');
                $database->close();
                $resp->msg = '出票状态sql执行异常';
                return $resp;
            }
            $ticketIdArr = $database->multiInsertId();
            if (count($insertDataArr) != count($ticketIdArr)) {
                $database->execute('rollback');
                $database->close();
                $resp->msg = '出票插入执行异常';
                return $resp;
            }
            $insertDataMap = array();
            for ($i = 0, $length = count($ticketIdArr); $i < $length; $i++) {
                $ticketId = (int)$ticketIdArr[$i];
                if ($ticketId <= 0) {
                    $database->execute('rollback');
                    $database->close();
                    $resp->msg = '出票id生成异常';
                    return $resp;
                }
                $insertDataArr[$i]['ticketId'] = $ticketId;
                $ticketLotteryId = trim($insertDataArr[$i]['ticketLotteryId']);
                $betUnits = (int)$insertDataArr[$i]['betUnits'];
                $multiple = (int)$insertDataArr[$i]['multiple'];
                $betMoney = (int)$insertDataArr[$i]['betMoney'];
                $betContent = trim($insertDataArr[$i]['betContent']);
                if (!empty($ticketLotteryId) && $betUnits > 0 && $multiple > 0 && $betMoney > 0 && !empty($betContent)) {
                    if (!key_exists($ticketLotteryId, $insertDataMap)) {
                        $insertDataMap[$ticketLotteryId] = array();
                    }
                    $insertDataMap[$ticketLotteryId][] = $insertDataArr[$i];
                }
            }
            $ticketNum = 0;
            $bodyArr = array();
            foreach ($insertDataMap as $ticketLotteryId => $dataArr) {
                $countNum = 0;
                $countMoney = 0;
                $countTicket = array();
                for ($i = 0, $length = count($dataArr); $i < $length; $i++) {
                    $ticketId = (int)$dataArr[$i]['ticketId'];
                    $betUnits = (int)$dataArr[$i]['betUnits'];
                    $multiple = (int)$dataArr[$i]['multiple'];
                    $betMoney = (int)$dataArr[$i]['betMoney'];
                    $betContent = trim($dataArr[$i]['betContent']);
                    $countNum++;
                    $countMoney += $betMoney;
                    $countTicket[] = '<ticket ticketId="'.$ticketId.'" betType="'.$ticketLotteryId.'" issueNumber="" betUnits="'.$betUnits.'" multiple="'.$multiple.'" betMoney="'.$betMoney.'" isAppend="0"><betContent>'.$betContent.'</betContent></ticket>';
                    if ($i == ($length - 1) || $countNum == 50) {
                        $ticketNum += $countNum;
                        $body = array();
                        $body[] = '<ticketorder lotteryId="'.$ticketLotteryId.'" ticketsnum="'.$countNum.'" totalmoney="'.$countMoney.'">';
                        $body[] = '<tickets>'.implode('', $countTicket).'</tickets>';
                        $body[] = '</ticketorder>';
                        $bodyArr[] = implode('', $body);
                        $countNum = 0;
                        $countMoney = 0;
                        $countTicket = array();
                    }
                }
            }
            if (count($ticketIdArr) != $ticketNum) {
                $database->execute('rollback');
                $database->close();
                $resp->msg = '插入票和请求出票数量不符';
                return $resp;
            }
            //出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
            //更新订单状态
            $updateOrderSql = 'update t_order set ticketStatus=7 where orderId="' . $orderId . '" and orderType=9 and status=2 and ticketStatus=0 limit 1 ';
            $updateOrderResult = $database->execute($updateOrderSql);
            $updateOrderAffectedRows = (int)$database->getAffectedRows();
            if (!$updateOrderResult || $updateOrderAffectedRows <= 0) {
                $database->execute('rollback');
                $database->close();
                $resp->msg = '更新订单出票状态失败';
                return $resp;
            }
            $database->execute('commit');
            $database->close();
            foreach ($bodyArr as $body) {
                $this->request('002', $body);
            }
            $resp->errCode = 0;
            $resp->msg = '成功';
            return $resp;
        } else {
            $resp->msg = '出票事物异常';
            return $resp;
        }
    }

    //票状态出票商主动通知
    public function guessTicketStatusNotify($ticketresults, $orderIdArr, $ticketMap) {
        $resp = requireModule('Resp');
        $orderIdArr = $this->common->filterIdArray($orderIdArr);
        if (!is_array($ticketresults) || count($ticketresults) <= 0 || !is_array($orderIdArr) || count($orderIdArr) <= 0 || !is_array($ticketMap) || count($ticketMap) <= 0) {
            $resp->msg = '参数异常';
            return $resp;
        }
        $param = array();
        $param['orderId'] = $orderIdArr;
        $param['orderType'] = 9;//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=出票订单, 9=冠亚军竞猜订单
        $param['status'] = 2; //订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        $param['ticketSupplierId'] = $this->supplierId;//出票供应商
        $param['pageNum'] = 1;
        $param['pageSize'] = 50;
        $selectOrderResp = $this->orderService->selectOrder($param);
        if ($selectOrderResp->errCode != 0) {
            $resp->msg = '订单查询异常';
            return $resp;
        }
        $orderList = $selectOrderResp->data['list'];
        $orderMap = array();
        foreach ($orderList as $order) {
            $orderId = (int)$order['orderId'];
            if ($orderId > 0) {
                $orderMap[$orderId] = $order;
            }
        }
        if (count($orderMap) <= 0) {
            $resp->msg = '票订单查询异常';
            return $resp;
        }
        $orderSqlArr = array();
        $ticketSqlArr = array();
        $ticketReturnArr = array();
        $setOrderIdArr = array();
        $database = requireModule("Database");
        foreach ($ticketresults as $ticketresult) {
            $ticketId = (int)$ticketresult['ticketId'];
            $lotteryId = trim($ticketresult['lotteryId']);
            $platformId = trim($ticketresult['palmId']);
            $statusCode = trim($ticketresult['statusCode']);
            $printOdds = trim($ticketresult['printodd']);
            $printNo = trim($ticketresult['printNo']);
            $printTime = trim($ticketresult['PrintOutTime']);
            $ticket = $ticketMap[$ticketId];
            $ticketCreateTime = strtotime(trim($ticket['createTime']));
            $matchRecommend = trim($ticket['matchRecommend']);
            $updateMatchRecommend = json_decode($matchRecommend, true);
            $orderId = (int)$ticket['orderId'];
            $order = $orderMap[$orderId];
            $planMatchRecommend = trim($order['planMatchRecommend']);
            $updatePlanMatchRecommend = json_decode($planMatchRecommend, true);
            //statusCode, 000=订单不存在, 001=等待交易, 002=交易中, 003=交易成功, 004=交易失败
            if (empty($lotteryId) || $ticketId <= 0 || empty($ticket) || empty($matchRecommend) || empty($updateMatchRecommend) || $orderId <= 0 || empty($order) || empty($planMatchRecommend) || empty($updatePlanMatchRecommend) || ($statusCode != '000' && $statusCode != '003' && $statusCode != '004')) {
                continue;
            };
            $status = 0;//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已撤单
            if ($statusCode == '003') {
                $status = 2;
            } else if ($statusCode == '004') {
                $status = 1;
            } else if ($statusCode == '000' && (time()-$ticketCreateTime) > 60) {//防止出票商集群服务器不同步产生"不存在"异常
                $status = 1;
            }
            //添加更新票信息
            $ticketField = array();
            $ticketField[] = 'status="' . $database->escape($status) . '"';
            $ticketField[] = 'platformId="' . $database->escape($platformId) . '"';
            $ticketField[] = 'printOdds="' . $database->escape($printOdds) . '"';
            $ticketField[] = 'printNo="' . $database->escape($printNo) . '"';
            $ticketField[] = 'printTime="' . $database->escape($printTime) . '"';
            $ticketReturnArr[] = '<returnticketresult lotteryId="'.$ticketId.'" palmId="'.$platformId.'"/>';
            $setOrderIdArr[] = $orderId;
            if (!empty($printOdds)) {
                //$printOdds  赔率 3;3.4  用分号隔开
                $matchApp = explode(';', $printOdds);
                foreach ($updateMatchRecommend as $k => &$rd) {
                    $oddsId = (int)$rd['oddsId'];
                    $betOdds = trim($matchApp[$k]);
                    if ($oddsId <= 0 || empty($betOdds)) {
                        continue;
                    }
                    $rd['odds'] = sprintf('%.2f', $betOdds);
                }
                $updateMatchRecommend = json_encode($updateMatchRecommend);
                if ($updateMatchRecommend != $matchRecommend) {
                    $ticketField[] = 'matchRecommend="' . $database->escape($updateMatchRecommend) . '"';
                }
                //更新订单赔率
                foreach ($updatePlanMatchRecommend as $k => &$rd) {
                    $oddsId = (int)$rd['oddsId'];
                    $betOdds = trim($matchApp[$k]);
                    if ($oddsId <= 0 || empty($betOdds)) {
                        continue;
                    }
                    $rd['odds'] = sprintf('%.2f', $betOdds);
                }
                $updatePlanMatchRecommend = json_encode($updatePlanMatchRecommend);
                if ($updatePlanMatchRecommend != $planMatchRecommend) {
                    $field = array();
                    $field[] = 'planMatchRecommend="' . $database->escape($updatePlanMatchRecommend) . '"';
                    $orderSqlArr[] = 'update t_order set ' . implode(',', $field) . ' where orderId="' . $orderId . '" limit 1';
                }
            }
            //放在这里是因为等待上面更新"赔率"和"让球或让分"
            $ticketSqlArr[] = 'update t_ticket set ' . implode(',', $ticketField) . ' where ticketId="' . $ticketId . '" and status=0 limit 1';
        }
        $orderSqlArr = array_unique($orderSqlArr);
        $ticketSqlArr = array_unique($ticketSqlArr);
        $ticketReturnArr = array_unique($ticketReturnArr);
        $setOrderIdArr = array_unique($setOrderIdArr);
        $sqlArr = array_merge($orderSqlArr, $ticketSqlArr);
        if (count($sqlArr) <= 0 || count($ticketReturnArr) <= 0) {
            $database->close();
            $resp->msg = '执行数组异常';
            return $resp;
        }
        $sql = implode(';', $sqlArr);
        $result = $database->multiExecute($sql);
        $database->multiFree();
        if (!$result) {
            $database->close();
            $resp->msg = '出票状态sql执行异常';
            return $resp;
        }
        $database->close();
        if (count($setOrderIdArr) > 0) {
            $message = requireModule('Message');
            foreach ($setOrderIdArr as $orderId) {
                $message->publish('orderTicketStatus', $orderId);
            }
        }
        $resp->data = $ticketReturnArr;
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }

    //查询票状态
    public function guessTicketStatus() {
        $resp = requireModule('Resp');
        $param = array();
        $param['supplierId'] = $this->supplierId;
        $param['status'] = 0;//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已撤单
        $param['needSport'] = true;
        $param['justCount'] = true;
        $selectTicketResp = $this->ticketService->selectTicket($param);
        if ($selectTicketResp->errCode != 0) {
            $resp->msg = '票查询异常';
            return $resp;
        }
        $data = $selectTicketResp->data;
        $totalCount = (int)$data['totalCount'];
        $pageSum = (int)ceil($totalCount/50);
        if ($totalCount <= 0 || $pageSum <= 0) {
            $resp->msg = '不存在需要设置状态的票';
            return $resp;
        }
        for ($i = 1; $i <= $pageSum; $i++) {
            $this->doGuessTicketStatus($i);
        }
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }

    //查询票状态
    private function doGuessTicketStatus($pageNum) {
        $resp = requireModule('Resp');
        $pageNum = (int)$pageNum;
        if ($pageNum <= 0) {
            $resp->msg = '票页码异常';
            return $resp;
        }
        $param = array();
        $param['supplierId'] = $this->supplierId;
        $param['status'] = 0;//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已撤单
        $param['needSport'] = true;
        $param['orderBy'] = 1;
        $param['pageNum'] = $pageNum;
        $param['pageSize'] = 50;//一次可以查询50张票,只能查询7天之内的数据
        $selectTicketResp = $this->ticketService->selectTicket($param);
        if ($selectTicketResp->errCode != 0) {
            $resp->msg = '票查询异常';
            return $resp;
        }
        $ticketList = $selectTicketResp->data['list'];
        $orderIdArr = array();
        $tickets = array();
        $ticketMap = array();
        foreach ($ticketList as $ticket) {
            $orderId = (int)$ticket['orderId'];
            $ticketId = (int)$ticket['ticketId'];
            $status = (int)$ticket['status'];
            if ($orderId <= 0 || $ticketId <= 0 || $status != 0) {
                continue;
            }
            $orderIdArr[] = $orderId;
            $tickets[] = '<queryticket ticketId="'.$ticketId.'" />';
            $ticketMap[$ticketId] = $ticket;
        }
        $orderIdArr = array_unique($orderIdArr);
        if (count($orderIdArr) <= 0 || count($tickets) <= 0 || count($ticketMap) <= 0) {
            $resp->msg = '不存在需要设置状态的票';
            return $resp;
        }
        $param = array();
        $param['orderId'] = $orderIdArr;
        $param['orderType'] = 9;//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=出票订单, 9=冠亚军竞猜订单
        $param['status'] = 2; //订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        $param['ticketSupplierId'] = $this->supplierId;//出票供应商
        $param['pageNum'] = 1;
        $param['pageSize'] = 50;
        $selectOrderResp = $this->orderService->selectOrder($param);
        if ($selectOrderResp->errCode != 0) {
            $resp->msg = '订单查询异常';
            return $resp;
        }
        $orderList = $selectOrderResp->data['list'];
        $orderMap = array();
        foreach ($orderList as $order) {
            $orderId = (int)$order['orderId'];
            if ($orderId > 0) {
                $orderMap[$orderId] = $order;
            }
        }
        if (count($orderMap) <= 0) {
            $resp->msg = '票订单查询异常';
            return $resp;
        }
        $body = implode('', $tickets);
        $requestResp = $this->request('003', $body);
        if ($requestResp->errCode != 0 || empty($requestResp->data)) {
            $resp->msg = '出票请求有误';
            return $resp;
        }
        $xml = $requestResp->data;
        $orderSqlArr = array();
        $ticketSqlArr = array();
        $setOrderIdArr = array();
        $database = requireModule("Database");
        foreach ($xml->children() as $child1) {
            $nodeName1 = trim($child1->getName());
            if ($nodeName1 != 'body') {
                continue;
            }
            foreach ($child1->children() as $child2) {
                $nodeName2 = trim($child2->getName());
                if ($nodeName2 != 'ticketresult') {
                    continue;
                }
                $lotteryId = trim($child2['lotteryId']);
                $ticketId = (int)$child2['ticketId'];
                $platformId = trim($child2['palmId']);
                $statusCode = trim($child2['statusCode']);
                $printOdds = trim($child2['printodd']);
                $printNo = trim($child2['printNo']);
                $printTime = trim($child2['PrintOutTime']);
                $ticket = $ticketMap[$ticketId];
                $ticketCreateTime = strtotime(trim($ticket['createTime']));
                $matchRecommend = trim($ticket['matchRecommend']);
                $updateMatchRecommend = json_decode($matchRecommend, true);
                $orderId = (int)$ticket['orderId'];
                $order = $orderMap[$orderId];
                $planMatchRecommend = trim($order['planMatchRecommend']);
                $updatePlanMatchRecommend = json_decode($planMatchRecommend, true);
                //statusCode, 000=订单不存在, 001=等待交易, 002=交易中, 003=交易成功, 004=交易失败
                if (empty($lotteryId) || $ticketId <= 0 || empty($ticket) || empty($matchRecommend) || empty($updateMatchRecommend) || $orderId <= 0 || empty($order) || empty($planMatchRecommend) || empty($updatePlanMatchRecommend) || ($statusCode != '000' && $statusCode != '003' && $statusCode != '004')) {
                    continue;
                };
                $status = 0;//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已撤单
                if ($statusCode == '003') {
                    $status = 2;
                } else if ($statusCode == '004') {
                    $status = 1;
                } else if ($statusCode == '000' && (time()-$ticketCreateTime) > 60) {//防止出票商集群服务器不同步产生"不存在"异常
                    $status = 1;
                }
                //添加更新票信息
                $ticketField = array();
                $ticketField[] = 'status="' . $database->escape($status) . '"';
                $ticketField[] = 'platformId="' . $database->escape($platformId) . '"';
                $ticketField[] = 'printOdds="' . $database->escape($printOdds) . '"';
                $ticketField[] = 'printNo="' . $database->escape($printNo) . '"';
                $ticketField[] = 'printTime="' . $database->escape($printTime) . '"';
                $setOrderIdArr[] = $orderId;
                if (!empty($printOdds)) {
                    //$printOdds  赔率 3;3.4  用分号隔开
                    $matchApp = explode(';', $printOdds);
                    foreach ($updateMatchRecommend as $k => &$rd) {
                        $oddsId = (int)$rd['oddsId'];
                        $betOdds = trim($matchApp[$k]);
                        if ($oddsId <= 0 || empty($betOdds)) {
                            continue;
                        }
                        $rd['odds'] = sprintf('%.2f', $betOdds);
                    }
                    $updateMatchRecommend = json_encode($updateMatchRecommend);
                    if ($updateMatchRecommend != $matchRecommend) {
                        $ticketField[] = 'matchRecommend="' . $database->escape($updateMatchRecommend) . '"';
                    }
                    //更新订单赔率
                    foreach ($updatePlanMatchRecommend as $k => &$rd) {
                        $oddsId = (int)$rd['oddsId'];
                        $betOdds = trim($matchApp[$k]);
                        if ($oddsId <= 0 || empty($betOdds)) {
                            continue;
                        }
                        $rd['odds'] = sprintf('%.2f', $betOdds);
                    }
                    $updatePlanMatchRecommend = json_encode($updatePlanMatchRecommend);
                    if ($updatePlanMatchRecommend != $planMatchRecommend) {
                        $field = array();
                        $field[] = 'planMatchRecommend="' . $database->escape($updatePlanMatchRecommend) . '"';
                        $orderSqlArr[] = 'update t_order set ' . implode(',', $field) . ' where orderId="' . $orderId . '" limit 1';
                    }
                }
                //放在这里是因为等待上面更新"赔率"和"让球或让分"
                $ticketSqlArr[] = 'update t_ticket set ' . implode(',', $ticketField) . ' where ticketId="' . $ticketId . '" and status=0 limit 1';
            }
        }
        $orderSqlArr = array_unique($orderSqlArr);
        $ticketSqlArr = array_unique($ticketSqlArr);
        $setOrderIdArr = array_unique($setOrderIdArr);
        $sqlArr = array_merge($orderSqlArr, $ticketSqlArr);
        if (count($sqlArr) <= 0) {
            $database->close();
            $resp->msg = '执行数组异常';
            return $resp;
        }
        $sql = implode(';', $sqlArr);
        $result = $database->multiExecute($sql);
        $database->multiFree();
        if (!$result) {
            $database->close();
            $resp->msg = '出票状态sql执行异常';
            return $resp;
        }
        $database->close();
        if (count($setOrderIdArr) > 0) {
            $message = requireModule('Message');
            foreach ($setOrderIdArr as $orderId) {
                $message->publish('orderTicketStatus', $orderId);
            }
        }
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }
}