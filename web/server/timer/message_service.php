#!/usr/local/php-7.0.7/bin/php -q
<?php
//出票订单算奖
set_time_limit(0);//设置脚本超时时间，为0时不受时间限制
date_default_timezone_set('PRC');
error_reporting(E_ALL ^ E_NOTICE);
include_once(__DIR__."/../include/core.php");
include_once(__DIR__."/OrderPrize.php");
include_once(__DIR__."/OrderRefund.php");
include_once(__DIR__."/OrderSendPrize.php");

class MessageService {
    private $common;
    private $commonService;
    private $orderService;
    private $userService;
    private $message;

    public function __construct() {
        $this->common = requireModule("Common");
        $this->commonService = requireService("Common");
        $this->orderService = requireService("Order");
        $this->userService = requireService("User");
        $this->message = requireModule('Message');
    }

    public function execute() {
        $channels = array(
            'payOrderForTicketDeal',
            'payOrderForStation',
            'orderTicketStatus',
            'orderTicketPrize',
            'orderResult'
        );
        $this->message->subscribe($channels, array($this, 'subscribeCallback'));
    }

    public function subscribeCallback($redis, $channel, $message) {
        switch($channel) {
            case 'payOrderForTicketDeal' : $this->payOrderForTicketDeal($message); break;
            case 'payOrderForStation' : $this->payOrderForStation($message); break;
            case 'orderTicketStatus' : $this->orderTicketStatus($message); break;
            case 'orderTicketPrize' : $this->orderTicketPrize($message); break;
            case 'orderResult' : $this->orderResult($message); break;
        }
    }

    public function payOrderForTicketDeal($orderId) {
        $orderId = (int)$orderId;
        if ($orderId <= 0) {
            $this->common->logger->info(__METHOD__ .'：订单id异常');
            return;
        }
        $selectOrderByIdResp = $this->orderService->selectOrderById($orderId);
        if ($selectOrderByIdResp->errCode != 0) {
            $this->common->logger->info(__METHOD__ .'：查询订单异常('.$orderId.')');
            return;
        }
        $order = $selectOrderByIdResp->data;
        if (empty($order)) {
            $this->common->logger->info(__METHOD__ .'：订单信息有误('.$orderId.')');
            return;
        }
        $orderType = (int)$order['orderType'];
        $ticketSupplierId = (int)$order['ticketSupplierId'];
        if ($ticketSupplierId > 0) {
            if ($ticketSupplierId == 1) {
                $zongGuan = requireModule('ZongGuan');
                if ($orderType == 3) {
                    $zongGuan->orderTicketDeal(array($orderId));
                } else if ($orderType == 7) {
                    $zongGuan->orderDigitalTicketDeal(array($orderId));
                } else if ($orderType == 9) {
                    $zongGuan->orderGuessTicketDeal(array($orderId));
                }
            }
        }
        $lottery = '';
        if ($orderType == 3) {
            $lottery = '竞技彩';
        } else if ($orderType == 7) {
            $lottery = '数字彩';
        } else if ($orderType == 9) {
            $lottery = '冠亚军';
        }
        $this->common->logger->info($lottery.__METHOD__ .'：处理完成');
    }

    public function payOrderForStation($orderId) {
        $orderId = (int)$orderId;
        if ($orderId <= 0) {
            $this->common->logger->info(__METHOD__ .'：订单id异常');
            return;
        }
        $this->sendPayTicketOrderMessage($orderId);
        $this->common->logger->info(__METHOD__ .'：处理完成');
    }

    public function orderTicketStatus($orderId) {
        $orderId = (int)$orderId;
        if ($orderId <= 0) {
            $this->common->logger->info(__METHOD__ .'：订单id异常');
            return;
        }
        $selectOrderByIdResp = $this->orderService->selectOrderById($orderId);
        if ($selectOrderByIdResp->errCode != 0) {
            $this->common->logger->info(__METHOD__ .'：查询订单异常('.$orderId.')');
            return;
        }
        $order = $selectOrderByIdResp->data;
        if (empty($order)) {
            $this->common->logger->info(__METHOD__ .'：订单信息有误('.$orderId.')');
            return;
        }
        $orderPrize = new OrderPrize();
        $orderRefund = new OrderRefund();
        $orderType = (int)$order['orderType'];
        if ($orderType == 3) {
            $orderPrize->doTicketStatus($orderId);
            $orderRefund->doRefundTicket($orderId);
        } else if ($orderType == 7) {
            $orderPrize->doDigitalTicketStatus($orderId);
            $orderRefund->doDigitalRefundTicket($orderId);
        } else if ($orderType == 9) {
            $orderPrize->doGuessTicketStatus($orderId); //更改订单状态
            $orderRefund->doRefundTicket($orderId); //退款还是竞技彩的退款流程
        }
        $lottery = '';
        if ($orderType == 3) {
            $lottery = '竞技彩';
        } else if ($orderType == 7) {
            $lottery = '数字彩';
        } else if ($orderType == 9) {
            $lottery = '冠亚军';
        }
        $this->common->logger->info($lottery.__METHOD__ .'：处理完成');
    }

    public function orderTicketPrize($orderId) {
        $orderId = (int)$orderId;
        if ($orderId <= 0) {
            $this->common->logger->info(__METHOD__ .'：订单id异常');
            return;
        }
        $selectOrderByIdResp = $this->orderService->selectOrderById($orderId);
        if ($selectOrderByIdResp->errCode != 0) {
            $this->common->logger->info(__METHOD__ .'：查询订单异常('.$orderId.')');
            return;
        }
        $order = $selectOrderByIdResp->data;
        if (empty($order)) {
            $this->common->logger->info(__METHOD__ .'：订单信息有误('.$orderId.')');
            return;
        }
        $orderPrize = new OrderPrize();
        $orderSendPrize = new OrderSendPrize();
        $orderType = (int)$order['orderType'];
        if ($orderType == 3) {
            $orderPrize->doTicketStatus($orderId);
            $orderPrize->doTicketPrizeAmount($orderId);
            $orderSendPrize->doSendPrize($orderId);
            $orderSendPrize->doAttachPrize($orderId);
        } else if ($orderType == 7) {
            $orderPrize->doDigitalTicketStatus($orderId);
            $orderPrize->doDigitalTicketPrizeAmount($orderId);
            $orderSendPrize->doDigitalSendPrize($orderId);
        } else if ($orderType == 9) {
            $orderPrize->doGuessTicketStatus($orderId); //更改订单状态
            $orderPrize->doTicketPrizeAmount($orderId);
            $orderSendPrize->doSendPrize($orderId);
        }
        $lottery = '';
        if ($orderType == 3) {
            $lottery = '竞技彩';
        } else if ($orderType == 7) {
            $lottery = '数字彩';
        } else if ($orderType == 9) {
            $lottery = '冠亚军';
        }
        $this->common->logger->info($lottery.__METHOD__ .'：处理完成');
    }

    public function orderResult($orderType) {
        $orderType = (int)$orderType;
        if ($orderType != 3 && $orderType != 7) {
            $this->common->logger->info(__METHOD__ .'：类型异常');
            return;
        }
        $orderPrize = new OrderPrize();
        $orderSendPrize = new OrderSendPrize();
        if ($orderType == 3) {
            $orderPrize->ticketStatus();
            $orderPrize->ticketPrizeAmount();
            $orderSendPrize->sendPrize();
            $orderSendPrize->attachPrize();
        } else if ($orderType == 7) {
            $orderPrize->digitalTicketStatus();
            $orderPrize->digitalTicketPrizeAmount();
            $orderSendPrize->digitalSendPrize();
        }
        $lottery = '';
        if ($orderType == 3) {
            $lottery = '竞技彩';
        } else if ($orderType == 7) {
            $lottery = '数字彩';
        }
        $this->common->logger->info($lottery.__METHOD__ .'：处理完成');
    }

    private function sendPayTicketOrderMessage($orderId) {
        $resp = requireModule('Resp');
        if ($orderId <= 0) {
            $resp->msg = '参数有误';
            return $resp;
        }
        $selectOrderByIdResp = $this->orderService->selectOrderById($orderId);
        if ($selectOrderByIdResp->errCode != 0) {
            $resp->msg = '查询订单异常';
            return $resp;
        }
        $orderData = $selectOrderByIdResp->data;
        if (empty($orderData)) {
            $resp->msg = '订单信息有误';
            return $resp;
        }
        $orderNumeric = $this->common->getOrderNumeric($orderData);
        if (!is_numeric($orderNumeric)) {
            $resp->msg = 'orderNumeric有误';
            return $resp;
        }
        $orderType = (int)$orderData['orderType'];
        if ($orderType != 3) {
            $resp->msg = 'orderType有误';
            return $resp;
        }
        $orderId = (int)$orderData['orderId'];
        $userId = (int)$orderData['userId'];
        $ticketUserId = (int)$orderData['ticketUserId'];
        $ticketMultiple = (int)$orderData['ticketMultiple'];
        $amount = (int)$orderData['amount'];
        $orderNo = $this->common->encodeNo($userId, $orderId);
        $orderData = $this->commonService->setMatchList(array($orderData), 'planMatchRecommend')[0];
        $matchList = $orderData['matchList'];
        $matchLength = count($matchList);
        if ($ticketUserId <= 0) {
            $resp->msg = 'ticketUserId有误';
            return $resp;
        }
        if (!is_array($matchList) || $matchLength <= 0) {
            $resp->msg = 'matchList有误';
            return $resp;
        }
        //周四005胜，周四007让胜+让平，10倍40元
        $matchInfo = [];
        foreach ($matchList as $match) {
            $number = trim($match['number']);
            $concede = (float)$match['concede'];
            $recommend = (array)$match['recommend'];
            $bettypeValue = $match['bettypeValue'];
            $rArr = [];
            foreach ($recommend as $r) {
                $rArr[] = ($concede!=0 ? '让' : '').trim($bettypeValue->$r);
            }
            $matchInfo[] = $number.implode('+', $rArr);
        }
        $matchInfo = implode('，', $matchInfo).'，'.$ticketMultiple.'倍'.($amount/100).'元';
        $selectUserByIdResp = $this->userService->selectUserById($ticketUserId);
        if ($selectUserByIdResp->errCode != 0) {
            $resp->msg = '查询用户异常';
            return $resp;
        }
        $user = $selectUserByIdResp->data;
        if (empty($user)) {
            $resp->msg = '查询用户不存在';
            return $resp;
        }
        $openId = trim($user['openId']);
        $subscribe = (int)$user['subscribe'];
        if (empty($openId)) {
            $resp->msg = '无效的openId';
            return $resp;
        }
        if ($subscribe != 1) {
            $resp->msg = '未关注公众号';
            return $resp;
        }
        global $curEnv;
        $url = '';
        if ($curEnv == 'dist') {
            $url = 'http://www.shaimii.com/#supplierTicketOrderDetail&orderNo='.$orderNo;
            $templateId = 'KJu44MMR2wmKKm6IZ5_TYP-054-GCZwiE06oFCLMJeY';
        } else if ($curEnv == 'beta') {
            $url = 'http://beta.shaimii.com/#supplierTicketOrderDetail&orderNo='.$orderNo;
            $templateId = 'Q95YDB-KfSfawIElXIKskhD6nFLGHwgxfCi5188dgzo';
        }
        $data = array();
        $data['first'] = array('value' => '您有代购方案等待出票', 'color' => '#000000');
        $data['keyword1'] = array('value' => $orderNumeric, 'color' => '#000000');
        $data['keyword2'] = array('value' => '竞足'.($matchLength==1?'单关':$matchLength.'串1'), 'color' => '#000000');
        $data['keyword3'] = array('value' => $matchInfo, 'color' => '#000000');
        $data['remark'] = array('value' => '点击立即查看', 'color' => '#000000');
        $jssdk = requireModule('Jssdk');
        $postJson = array(
            'touser' => $openId,
            'template_id' => $templateId,
            'url' => $url,
            'data' => $data
        );
        $accessToken = $jssdk->getAccessToken();
        $url = 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token='.$accessToken;
        $param = json_encode($postJson);
        $httpPostResp = $jssdk->httpPost($url, $param);
        $respJson = json_decode($httpPostResp);
        if (empty($param) || empty($respJson) || $respJson->errcode != 0) {
            $this->common->logger->info('发送模版消息异常：'.$httpPostResp);
            $resp->msg = '发送模版消息异常：'.$httpPostResp;
            return $resp;
        }
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }
}

//开始运行
$messageService = new MessageService();
$messageService->execute();