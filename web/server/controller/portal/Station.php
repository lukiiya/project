<?php
namespace controller\portal;
use controller\Base;

class Station extends Base {
	private $common;
	private $resp;
	private $jsonView;
	private $commonService;
    private $orderService;
	private $stationService;
	public $loginUserInfo;
	public $loginUserRight;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->resp = requireModule("Resp");
		$this->jsonView = requireView("Json");
		$this->commonService = requireService("Common");
        $this->orderService = requireService("Order");
		$this->stationService = requireService("Station");
	}

    //店长出票统计
    public function stationTicketStatistics() {
        if (empty($this->loginUserInfo)) {
            $this->resp->errCode = 1;
            $this->resp->msg = "用户未登录";
            $this->jsonView->out($this->resp);
        }
        $userId = $this->loginUserInfo['userId'];
        $nickName = $this->loginUserInfo['nickName'];
        $realName = $this->loginUserInfo['realName'];
        //返回map组建
        $stationTicketMap = array(
            'nickName' => $nickName,
            'realName' => $realName,
            'ticketTotalAmount' => 0,    //店长出票金额总计
            'prizeTotalAmount' => 0,   //出票中奖金额总计
            'depositTotalAmount' => 0, //预付出票款
            'spareTotalAmount' => 0, //剩余出票款
            'ticketAmountList' => array()  //出票金额列表
        );
        //存款表数据
        $param = array();
        $param['userId'] = $userId;
        $param['justCount'] = true;
        $selectStationDepositResp = $this->stationService->selectStationDeposit($param);
        if ($selectStationDepositResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $depositTotalAmount = $selectStationDepositResp->data['totalAmount'];//预付出票款总额
        //订单数据
        $param = array();
        $param['ticketUserId'] = $userId;
        $param['orderType'] = 3;   //订单类型, 3:出票订单
        $param['status'] = 2;//付款状态, 1=未付款, 2=已付款, 3=已退款
        $param['ticketStatus'] = array(2,3,4,5,6);//出票状态, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖
        $selectOrderResp = $this->orderService->selectOrder($param);
        if ($selectOrderResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $orderList = $selectOrderResp->data['list'];
        $ticketAmountMap = array();
        for ($i = 0, $length = count($orderList); $i < $length; $i++) {
            $amount = (int)$orderList[$i]['amount'];
            $ticketStatus = (int)$orderList[$i]['ticketStatus'];//出票状态, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖
            $ticketPrizeAmount = (int)$orderList[$i]['ticketPrizeAmount'];  //派奖金额
            $createTime = trim($orderList[$i]['createTime']);
            //共出票的金额
            $stationTicketMap['ticketTotalAmount'] += $amount;
            //已中奖金额 ticketPrizeAmount派奖金额     ticketExpectPrizeAmount预计派奖金额   ticketSendPrizeAmount已派奖金额
            if ($ticketStatus == 5) {
                $stationTicketMap['prizeTotalAmount'] += $ticketPrizeAmount;
            }
            $yearMouth = trim(date('Y年m月', strtotime($createTime)));
            if (!key_exists($yearMouth, $ticketAmountMap)) {
                $ticketAmountMap[$yearMouth] = 0;
            }
            $ticketAmountMap[$yearMouth] += $amount;
        }
        krsort($ticketAmountMap);
        foreach ($ticketAmountMap as $date => $amount) {
            $stationTicketMap['ticketAmountList'][] = array(
                'date' => $date,
                'amount' => $amount
            );
        }
        $spareTotalAmount = $depositTotalAmount + $stationTicketMap['prizeTotalAmount'] - $stationTicketMap['ticketTotalAmount'];
        $stationTicketMap['depositTotalAmount'] = $depositTotalAmount; //预付出票款
        $stationTicketMap['spareTotalAmount'] = $spareTotalAmount; //剩余出票款
        $this->resp->data = $stationTicketMap;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }
}