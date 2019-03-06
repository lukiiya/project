<?php
namespace controller\portal;
use controller\Base;

class ZongGuan extends Base {
    private $common;
    private $resp;
    private $textView;
    private $ticketService;

    public function __construct() {
        $this->common = requireModule("Common");
        $this->resp = requireModule("Resp");
        $this->textView = requireView("Text");
        $this->ticketService = requireService("Ticket");
    }

    public function ticketNotify() {
        $zongGuan = requireModule('ZongGuan');
        $verifyNotifyResp = $zongGuan->verifyNotify();
        if ($verifyNotifyResp->errCode != 0) {
            $this->textView->out($verifyNotifyResp->msg);
        }
        $xml = $verifyNotifyResp->data;
        $this->common->logger->info('出票推送通知成功');
        if (empty($xml)) {
            $this->textView->out('通知数据不是正确的xml');
        }
        $head = null;
        foreach ($xml->children() as $child) {
            $nodeName = trim($child->getName());
            if ($nodeName == 'head') {
                $head = $child;
                break;
            }
        }
        if (empty($head)) {
            $this->textView->out('通知数据不是正确的xml');
        }
        $transcode = trim($head['transcode']);
        if ($transcode == '007') {
            $this->ticketStatusNotify($xml);
        } else if ($transcode == '202') {
            $this->ticketPrizeNotify($xml);
        }
    }

    public function ticketStatusNotify($xml) {
        if (empty($xml)) {
            $this->textView->out('通知数据不是正确的xml');
        }
        $zongGuan = requireModule('ZongGuan');
        $ticketresultsNode = null;
        foreach ($xml->children() as $child1) {
            $nodeName1 = trim($child1->getName());
            if ($nodeName1 != 'body') {
                continue;
            }
            foreach ($child1->children() as $child2) {
                $nodeName2 = trim($child2->getName());
                if ($nodeName2 == 'ticketresults') {
                    $ticketresultsNode = $child2;
                    break;
                }
            }
        }
        if ($ticketresultsNode == null) {
            $this->textView->out('票状态通知xml有误');
        }
        $ticketresultMap = array();
        $ticketIdArr = array();
        $ticketresultArr = array();
        foreach ($ticketresultsNode->children() as $ticketresult) {
            $lotteryId = trim($ticketresult['lotteryId']);
            $ticketId = (int)$ticketresult['ticketId'];
            $platformId = trim($ticketresult['palmId']);
            $statusCode = trim($ticketresult['statusCode']);//003=交易成功, 004=交易失败
            if (empty($lotteryId) || $ticketId <= 0 || empty($platformId) || ($statusCode != '003' && $statusCode != '004')) {
                continue;
            }
            $ticketresultMap[$ticketId] = $ticketresult;
            $ticketIdArr[] = $ticketId;
            $ticketresultArr[] = array(
                'ticketId' => $ticketId,
                'platformId' => $platformId
            );
        }
        if (count($ticketIdArr) <= 0 || count($ticketresultMap) <= 0) {
            $this->textView->out('票状态通知的信息异常');
        }
        $param = array();
        $param['supplierId'] = $zongGuan->supplierId;
        $param['ticketId'] = $ticketIdArr;
        $param['status'] = 0;//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已撤单
        $param['orderBy'] = 1;
        $param['pageNum'] = 1;
        $param['pageSize'] = 50;//最大通知50张票
        $selectTicketResp = $this->ticketService->selectTicket($param);
        if ($selectTicketResp->errCode != 0) {
            $this->textView->out('票查询异常');
        }
        $ticketList = $selectTicketResp->data['list'];
        $resultMap = array('sport' => array(), 'digital' => array(), 'guess' => array());
        $orderIdMap = array('sport' => array(), 'digital' => array(), 'guess' => array());
        $ticketMap = array('sport' => array(), 'digital' => array(), 'guess' => array());
        foreach ($ticketList as $ticket) {
            $orderId = (int)$ticket['orderId'];
            $ticketId = (int)$ticket['ticketId'];
            $status = (int)$ticket['status'];
            $passType = trim($ticket['passType']);
            $betType = trim($ticket['betType']);
            $lotteryId = trim($ticket['lotteryId']);
            $ticketresult = $ticketresultMap[$ticketId];
            if ($orderId <= 0 || $ticketId <= 0 || $status != 0 || empty($lotteryId)) {
                continue;
            }
            if (!empty($passType) && empty($betType) && $lotteryId != 'SJBGJ' && $lotteryId != 'SJBGYJ') {
                $resultMap['sport'][] = $ticketresult;
                $ticketMap['sport'][$ticketId] = $ticket;
                $orderIdMap['sport'][] = $orderId;
            } else if (empty($passType) && !empty($betType)) {
                $resultMap['digital'][] = $ticketresult;
                $ticketMap['digital'][$ticketId] = $ticket;
                $orderIdMap['digital'][] = $orderId;
            } else if ($lotteryId == 'SJBGJ' || $lotteryId == 'SJBGYJ') {
                $resultMap['guess'][] = $ticketresult;
                $ticketMap['guess'][$ticketId] = $ticket;
                $orderIdMap['guess'][] = $orderId;
            }
        }
        $orderIdMap['sport'] = array_unique($orderIdMap['sport']);
        $orderIdMap['digital'] = array_unique($orderIdMap['digital']);
        $orderIdMap['guess'] = array_unique($orderIdMap['guess']);
        $ticketReturnArr = array();
        if (count($ticketMap['sport']) <= 0 && count($ticketMap['digital']) <= 0 && count($ticketMap['guess']) <= 0 && count($orderIdMap['sport']) <= 0 && count($orderIdMap['digital']) <= 0 && count($orderIdMap['guess']) <= 0) {
            //票已经处理过，返回成功，防止重复推送
            foreach ($ticketresultArr as $ts) {
                $ticketReturnArr[] = '<returnticketresult lotteryId="' . $ts['ticketId'] . '" palmId="' . $ts['platformId'] . '"/>';
            }
        } else {
            if (count($resultMap['sport']) > 0 && count($orderIdMap['sport']) > 0 && count($ticketMap['sport']) > 0) {
                $ticketStatusNotifyResp = $zongGuan->ticketStatusNotify($resultMap['sport'], $orderIdMap['sport'], $ticketMap['sport']);
                if ($ticketStatusNotifyResp->errCode == 0) {
                    $ticketReturnArr = array_merge($ticketReturnArr, $ticketStatusNotifyResp->data);
                    $this->common->logger->info('竞技彩通知返回：'.print_r($ticketStatusNotifyResp->data, true));
                }
            }
            if (count($resultMap['digital']) > 0 && count($orderIdMap['digital']) > 0 && count($ticketMap['digital']) > 0) {
                $digitalTicketStatusNotifyResp = $zongGuan->digitalTicketStatusNotify($resultMap['digital'], $orderIdMap['digital'], $ticketMap['digital']);
                if ($digitalTicketStatusNotifyResp->errCode == 0) {
                    $ticketReturnArr = array_merge($ticketReturnArr, $digitalTicketStatusNotifyResp->data);
                    $this->common->logger->info('数字彩通知返回：'.print_r($digitalTicketStatusNotifyResp->data, true));
                }
            }
            if (count($resultMap['guess']) > 0 && count($orderIdMap['guess']) > 0 && count($ticketMap['guess']) > 0) {
                $guessTicketStatusNotifyResp = $zongGuan->guessTicketStatusNotify($resultMap['guess'], $orderIdMap['guess'], $ticketMap['guess']);
                if ($guessTicketStatusNotifyResp->errCode == 0) {
                    $ticketReturnArr = array_merge($ticketReturnArr, $guessTicketStatusNotifyResp->data);
                    $this->common->logger->info('冠亚军通知返回：'.print_r($guessTicketStatusNotifyResp->data, true));
                }
            }
        }
        $body = '<returnticketresults>'.implode('', $ticketReturnArr).'</returnticketresults>';
        $notifyReturnResp = $zongGuan->notifyReturn('107', $body);
        if ($notifyReturnResp->errCode != 0) {
            $this->textView->out('出票通知返回异常');
        }
        $this->common->logger->info('出票通知返回成功：'.$body);
        $this->textView->out($notifyReturnResp->data);
    }

    public function ticketPrizeNotify($xml) {
        if (empty($xml)) {
            $this->textView->out('通知数据不是正确的xml');
        }
        $zongGuan = requireModule('ZongGuan');
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
            $this->textView->out('票中奖通知xml有误');
        }
        $wonticketMap = array();
        $ticketIdArr = array();
        $wonticketArr = array();
        foreach ($wonticketsNode->children() as $wonticket) {
            $ticketId = (int)$wonticket['ticketId'];
            $platformId = trim($wonticket['palmId']);
            $state = trim($wonticket['state']);//2:已结算
            $prizeAmount = trim($wonticket['prize']) * 100;//税后奖金
            $pretaxPrizeAmount = trim($wonticket['pretaxPrice']) * 100;//税前奖金
            if ($ticketId <= 0 || empty($platformId) || $state != 2 || $prizeAmount <= 0 || $pretaxPrizeAmount <= 0) {
                continue;
            }
            $wonticketMap[$ticketId] = $wonticket;
            $ticketIdArr[] = $ticketId;
            $wonticketArr[] = array(
                'ticketId' => $ticketId,
                'platformId' => $platformId
            );
        }
        if (count($ticketIdArr) <= 0 || count($wonticketMap) <= 0) {
            $this->textView->out('票中奖通知的信息异常');
        }
        $param = array();
        $param['supplierId'] = $zongGuan->supplierId;
        $param['ticketId'] = $ticketIdArr;
        $param['status'] = 2;//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已撤单
        $param['orderBy'] = 1;
        $param['pageNum'] = 1;
        $param['pageSize'] = 50;//最大通知50张票
        $selectTicketResp = $this->ticketService->selectTicket($param);
        if ($selectTicketResp->errCode != 0) {
            $this->textView->out('票查询异常');
        }
        $ticketList = $selectTicketResp->data['list'];
        $resultMap = array('sport' => array(), 'digital' => array());
        $ticketMap = array('sport' => array(), 'digital' => array());
        foreach ($ticketList as $ticket) {
            $orderId = (int)$ticket['orderId'];
            $ticketId = (int)$ticket['ticketId'];
            $status = (int)$ticket['status'];
            $passType = trim($ticket['passType']);
            $betType = trim($ticket['betType']);
            $wonticket = $wonticketMap[$ticketId];
            if ($orderId <= 0 || $ticketId <= 0 || $status != 2) {
                continue;
            }
            if (!empty($passType) && empty($betType)) {
                $resultMap['sport'][] = $wonticket;
                $ticketMap['sport'][$ticketId] = $ticket;
            } else if (empty($passType) && !empty($betType)) {
                $resultMap['digital'][] = $wonticket;
                $ticketMap['digital'][$ticketId] = $ticket;
            }
        }
        $ticketReturnArr = array();
        if (count($ticketMap['sport']) <= 0 && count($ticketMap['digital']) <= 0) {
            //票已经处理过，返回成功，防止重复推送
            foreach ($wonticketArr as $ts) {
                $ticketReturnArr[] = '<returnwonticket lotteryId="' . $ts['ticketId'] . '" palmId="' . $ts['platformId'] . '"/>';
            }
        } else {
            if (count($resultMap['sport']) > 0 && count($ticketMap['sport']) > 0) {
                $ticketPrizeNotifyResp = $zongGuan->ticketPrizeNotify($resultMap['sport'], $ticketMap['sport']);
                if ($ticketPrizeNotifyResp->errCode == 0) {
                    $ticketReturnArr = array_merge($ticketReturnArr, $ticketPrizeNotifyResp->data);
                    $this->common->logger->info('竞技彩中奖通知返回：'.print_r($ticketPrizeNotifyResp->data, true));
                }
            }
            if (count($resultMap['digital']) > 0 && count($ticketMap['digital']) > 0) {
                $digitalTicketPrizeNotifyResp = $zongGuan->digitalTicketPrizeNotify($resultMap['digital'], $ticketMap['digital']);
                if ($digitalTicketPrizeNotifyResp->errCode == 0) {
                    $ticketReturnArr = array_merge($ticketReturnArr, $digitalTicketPrizeNotifyResp->data);
                    $this->common->logger->info('数字彩中奖通知返回：'.print_r($digitalTicketPrizeNotifyResp->data, true));
                }
            }
        }
        $body = '<returnwontickets>'.implode('', $ticketReturnArr).'</returnwontickets>';
        $notifyReturnResp = $zongGuan->notifyReturn('212', $body);
        if ($notifyReturnResp->errCode != 0) {
            $this->textView->out('中奖通知返回异常');
        }
        $this->common->logger->info('中奖通知返回成功：'.$body);
        $this->textView->out($notifyReturnResp->data);
    }

    public function printTicketStatus() {
        $zongGuan = requireModule('ZongGuan');
        $zongGuan->printTicketStatus();
    }
}