<?php
class OrderPrize {
    private $common;
    private $commonService;
    private $orderService;
    private $ticketService;

    public function __construct() {
        $this->common = requireModule("Common");
        $this->commonService = requireService("Common");
        $this->orderService = requireService("Order");
        $this->ticketService = requireService("Ticket");
    }

    public function ticketStatus() {
        $param = array();
        $param['orderType'] = 3;//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=出票订单
        $param['status'] = array(2,4); //订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        $param['ticketStatus'] = array(0,2,7,8);//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
        $param['pageNum'] = 1;
        $param['pageSize'] = 1000;
        $selectOrderResp = $this->orderService->selectOrder($param);
        if ($selectOrderResp->errCode != 0) {
            $this->common->logger->info('订单查询异常');
            return;
        }
        $orderList = $selectOrderResp->data['list'];
        $this->common->logger->info(count($orderList).'个出票订单参与算奖');
        $orderList = $this->commonService->setMatchList($orderList, 'planMatchRecommend');
        for ($i = 0, $length = count($orderList); $i < $length; $i++) {
            $order = $orderList[$i];
            $orderId = (int)$order['orderId'];
            $orderType = (int)$order['orderType'];
            $status = (int)$order['status'];//订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
            $amount = (int)$order['amount'];
            $ticketStatus = (int)$order['ticketStatus'];//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
            $ticketUnit = (int)$order['ticketUnit'];
            $ticketMultiple = (int)$order['ticketMultiple'];
            $ticketPassType = trim($order['ticketPassType']);
            $ticketSupplierId = (int)$order['ticketSupplierId'];
            $planMatchBeginTime = trim($order['planMatchBeginTime']);
            $planMatchRecommend = trim($order['planMatchRecommend']);
            $orderMatchList = $order['matchList'];
            if (empty($order) || $orderId <= 0 || $orderType != 3 || ($status != 2 && $status != 4) || $amount <= 0 || ($ticketStatus != 0 && $ticketStatus != 2 && $ticketStatus != 7 && $ticketStatus != 8) || $ticketUnit <= 0 || $ticketMultiple <= 0 || empty($ticketPassType) || empty($planMatchBeginTime) || empty($planMatchRecommend) || empty($orderMatchList) || count($orderMatchList) <= 0) {
                continue;
            }
            $doTicketStatusResp = $this->doTicketStatus($orderId);
            if ($doTicketStatusResp->errCode != 0) {
                $this->common->logger->info('竞技彩订单算奖失败('.$orderId.')：'.$doTicketStatusResp->msg);
            } else {
                $this->common->logger->info('竞技彩订单算奖成功('.$orderId.')');
            }
        }
        $this->common->logger->info('竞技彩订单算奖完成('.count($orderList).')');
    }

    public function doTicketStatus($orderId) {
        $resp = requireModule('Resp');
        $orderId = (int)$orderId;
        if ($orderId <= 0) {
            $resp->msg = "orderId参数有误";
            return $resp;
        }
        $selectOrderByIdResp = $this->orderService->selectOrderById($orderId);
        if ($selectOrderByIdResp->errCode != 0) {
            $resp->msg = "查询订单异常";
            return $resp;
        }
        $order = $selectOrderByIdResp->data;
        if (empty($order)) {
            $resp->msg = "订单数据异常";
            return $resp;
        }
        $order = $this->commonService->setMatchList(array($order), 'planMatchRecommend')[0];
        $orderId = (int)$order['orderId'];
        $orderType = (int)$order['orderType'];
        $status = (int)$order['status'];//订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        $amount = (int)$order['amount'];
        $ticketStatus = (int)$order['ticketStatus'];//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
        $ticketUnit = (int)$order['ticketUnit'];
        $ticketMultiple = (int)$order['ticketMultiple'];
        $ticketPassType = trim($order['ticketPassType']);
        $ticketSupplierId = (int)$order['ticketSupplierId'];
        $planMatchBeginTime = trim($order['planMatchBeginTime']);
        $planMatchRecommend = trim($order['planMatchRecommend']);
        $orderMatchList = $order['matchList'];
        $ticketPrizeDivideStatus = (int)$order['ticketPrizeDivideStatus'];//中奖分成状态, 0=不分成, 1=待分成, 2=已分成, 3=未分成
        if ($orderId <= 0) {
            $resp->msg = "订单id异常";
            return $resp;
        }
        if ($orderType != 3) {
            $resp->msg = "订单类型异常";
            return $resp;
        }
        if ($status != 2 && $status != 4) {
            $resp->msg = "订单状态异常";
            return $resp;
        }
        if ($amount <= 0) {
            $resp->msg = "订单金额异常";
            return $resp;
        }
        if ($ticketStatus != 0 && $ticketStatus != 2 && $ticketStatus != 7 && $ticketStatus != 8) {
            $resp->msg = "出票状态异常";
            return $resp;
        }
        if ($ticketUnit <= 0) {
            $resp->msg = "注数异常";
            return $resp;
        }
        if ($ticketMultiple <= 0) {
            $resp->msg = "倍数异常";
            return $resp;
        }
        if (empty($ticketPassType)) {
            $resp->msg = "过关方式异常";
            return $resp;
        }
        if (empty($planMatchBeginTime)) {
            $resp->msg = "比赛开始时间异常";
            return $resp;
        }
        if (empty($planMatchRecommend) || empty($orderMatchList) || count($orderMatchList) <= 0) {
            $resp->msg = "比赛推荐异常";
            return $resp;
        }
        $ticketList = array();
        if ($ticketSupplierId > 0) {
            $param = array();
            $param['orderId'] = $orderId;
            $param['needSport'] = true;
            $selectTicketResp = $this->ticketService->selectTicket($param);
            if ($selectTicketResp->errCode != 0) {
                $this->common->logger->info('票查询异常');
                $resp->msg = "票查询异常";
                return $resp;
            }
            $ticketList = $selectTicketResp->data['list'];
        }
        $planMatchBeginTime = strtotime($planMatchBeginTime);
        $curTime = time();
        $ticketLength = count($ticketList);
        $errorLength = 0;
        $successLength = 0;
        $successMultipleMap = array();//出票成功倍数
        if ($ticketSupplierId > 0) {
            if (is_array($ticketList) && $ticketLength > 0) {
                $ticketCountAmount = 0;
                foreach ($ticketList as $ticket) {
                    $tId = (int)$ticket['ticketId'];
                    $ts = (int)$ticket['status'];//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已撤单
                    $ta = (int)$ticket['amount'];
                    $tm = (int)$ticket['multiple'];
                    $tb = trim($ticket['betContent']);
                    $tbMd5 = md5($tb);
                    if ($tId <= 0 || $ta <= 0 || $tm <= 0 || empty($tb) || empty($tbMd5)) {
                        $this->common->logger->info('票内容异常(ticketId='.$tId.')');
                        $resp->msg = '票内容异常(ticketId='.$tId.')';
                        return $resp;
                    }
                    $ticketCountAmount += $ta;
                    if ($ts == 1 || $ts == 5) {
                        $errorLength++;
                    } else if ($ts == 2 || $ts == 3 || $ts == 4) {
                        $successLength++;
                        //记录种投注成功的倍数
                        if (!key_exists($tbMd5, $successMultipleMap)) {
                            $successMultipleMap[$tbMd5] = 0;
                        }
                        //存在相同投注(99倍拆票)
                        $successMultipleMap[$tbMd5] += $tm;
                    }
                }
                if ($ticketCountAmount != $amount) {
                    $this->common->logger->info('订单和票信息不符(orderId='.$orderId.')');
                    $resp->msg = '订单和票信息不符(orderId='.$orderId.')';
                    return $resp;
                }
            }
        }
        $tStatus = null;//等待设置的票状态
        $ticketExpectPrizeAmount = 0;
        if ($ticketStatus == 0) {
            if ($curTime >= $planMatchBeginTime) {
                $tStatus = 1;
            }
        } else if ($ticketStatus == 7) {
            if ($ticketSupplierId > 0 && $ticketLength > 0) {
                if ($ticketLength == $errorLength) {
                    $tStatus = 1;
                } else if ($ticketLength == $successLength) {
                    $tStatus = 2;
                } else if ($ticketLength == ($successLength + $errorLength)) {
                    $tStatus = 8;
                }
            }
        } else if ($ticketStatus == 2 || $ticketStatus == 8) {
            $matchMap = array();
            foreach ($orderMatchList as $match) {
                $matchId = (int)$match['matchId'];
                $oddsId = (int)$match['oddsId'];
                if ($matchId <= 0 || $oddsId <= 0) {
                    $this->common->logger->info('过关赛事异常');
                    $resp->msg = '过关赛事异常';
                    return $resp;
                }
                $matchMap[$matchId.'-'.$oddsId] = $match;
            }
            $calculateTicketResp = $this->commonService->calculateTicket($planMatchRecommend, $ticketPassType);
            if ($calculateTicketResp->errCode != 0) {
                $this->common->logger->info($calculateTicketResp->msg);
                $resp->msg = $calculateTicketResp->msg;
                return $resp;
            }
            $ticketPassTypeMap = $calculateTicketResp->data;
            $countTicketUnit = 0;
            $countMatchRecommend = 0;
            $countWinPrizeStatus = 0;
            $countLostPrizeStatus = 0;
            foreach ($ticketPassTypeMap as $item) {
                $unit = (int)$item['ticketUnit'];
                $mrArr = $item['matchRecommend'];
                if ($unit <= 0 || !is_array($mrArr) || count($mrArr) <= 0) {
                    $this->common->logger->info('过关赛事异常');
                    $resp->msg = '过关赛事异常';
                    return $resp;
                }
                $countTicketUnit += $unit;
                foreach ($mrArr as $mr) {
                    $countMatchRecommend++;
                    $mrJson = json_decode($mr);
                    if (empty($mrJson)) {
                        $this->common->logger->info('过关赛事异常');
                        $resp->msg = '过关赛事异常';
                        return $resp;
                    }
                    $matchList = array();
                    foreach ($mrJson as $r) {
                        $matchId = (int)$r->matchId;
                        $oddsId = (int)$r->oddsId;
                        $match = $matchMap[$matchId.'-'.$oddsId];
                        if ($matchId <= 0 || $oddsId <= 0 || empty($match)) {
                            $this->common->logger->info('过关赛事异常');
                            $resp->msg = '过关赛事异常';
                            return $resp;
                        }
                        $matchList[] = $match;
                    }
                    $calculatePrizeResp = $this->commonService->calculatePrize($mr, $matchList);
                    if ($calculatePrizeResp->errCode != 0 || empty($calculatePrizeResp->data)) {
                        $this->common->logger->info($calculatePrizeResp->msg);
                        $resp->msg = $calculatePrizeResp->msg;
                        return $resp;
                    }
                    $prizeStatus = (int)$calculatePrizeResp->data['prizeStatus'];//中奖状态, 0=未开奖, 1=已中奖, 2=未中奖
                    $prizeAmount = (float)$calculatePrizeResp->data['prizeAmount'];//奖金基数(按1元1注计算)
                    //sp = 赔率*赔率*赔率...*2(单注价钱);
                    $sp = $this->common->roundSp($prizeAmount * 2, 2);//把sp,四舍六入五成双
                    if ($ticketSupplierId > 0) {
                        $successMultiple = 0;
                        //电子票
                        if ($ticketSupplierId == 1) {
                            $zongGuan = requireModule('ZongGuan');
                            $formatMatchListResp = $zongGuan->formatMatchList($matchList);
                            if ($formatMatchListResp->errCode != 0) {
                                $this->common->logger->info($formatMatchListResp->msg);
                                $resp->msg = $formatMatchListResp->msg;
                                return $resp;
                            }
                            $formatMatchListData = $formatMatchListResp->data;
                            $betContent = trim($formatMatchListData['betContent']);
                            $successMultiple = (int)$successMultipleMap[md5($betContent)];
                        } else {
                            $this->common->logger->info('匹配不了出票供应商');
                            $resp->msg = '匹配不了出票供应商';
                            return $resp;
                        }
                        if ($prizeStatus == 1) {
                            $countWinPrizeStatus++;
                            $ticketExpectPrizeAmount += $sp * $successMultiple * 100;
                        } else if ($prizeStatus == 2) {
                            $countLostPrizeStatus++;
                        }
                    } else {
                        //店长票
                        if ($prizeStatus == 1) {
                            $countWinPrizeStatus++;
                            $ticketExpectPrizeAmount += $sp * $ticketMultiple * 100;
                        } else if ($prizeStatus == 2) {
                            $countLostPrizeStatus++;
                        }
                    }
                }
            }
            if ($ticketUnit != $countTicketUnit) {
                $this->common->logger->info('订单注数和赛事注数不符');
                $resp->msg = '订单注数和赛事注数不符';
                return $resp;
            }
            if ($countMatchRecommend <= 0) {
                $this->common->logger->info('赛事推荐计数异常');
                $resp->msg = '赛事推荐计数异常';
                return $resp;
            }
            if ($countMatchRecommend != ($countWinPrizeStatus + $countLostPrizeStatus)) {
                //比赛还未全部算奖
                $resp->msg = '比赛还未全部算奖';
                return $resp;
            }
            if ($ticketStatus == 2) {
                if ($ticketSupplierId > 0) {
                    if ($ticketLength > 0 && $ticketLength == $successLength) {
                        if ($countWinPrizeStatus > 0) {
                            $tStatus = 4;
                        } else if ($countMatchRecommend == $countLostPrizeStatus) {
                            $tStatus = 3;
                        }
                    }
                } else {
                    if ($countWinPrizeStatus > 0) {
                        $tStatus = 4;
                    } else if ($countMatchRecommend == $countLostPrizeStatus) {
                        $tStatus = 3;
                    }
                }
            } else if ($ticketStatus == 8) {
                if ($ticketSupplierId > 0 && $status == 4 && $ticketLength > 0 && $ticketLength > $successLength) {
                    //"部分出票"的订单，需要等订单"部分退款"后才能算奖
                    //确认出票成功的都已经开奖
                    if ($countWinPrizeStatus > 0) {
                        $tStatus = 4;
                    } else if ($countMatchRecommend == $countLostPrizeStatus) {
                        $tStatus = 3;
                    }
                }
            }
        }
        if ($tStatus === null) {
            $resp->msg = "不符合状态设置";
            return $resp;
        }
        $calculatePrizeResp = $this->commonService->calculatePrize($planMatchRecommend, $orderMatchList);
        if ($calculatePrizeResp->errCode != 0 || empty($calculatePrizeResp->data)) {
            $this->common->logger->info($calculatePrizeResp->msg);
            $resp->msg = $calculatePrizeResp->msg;
            return $resp;
        }
        $planMatchRecommend = trim($calculatePrizeResp->data['matchRecommend']);
        if (empty($planMatchRecommend)) {
            $resp->msg = '算奖后赛事异常';
            return $resp;
        }
        $database = requireModule("Database");
        $sqlArr = array();
        $field = array();
        $field[] = 'ticketStatus="' . $database->escape($tStatus) . '"';
        if (($ticketStatus == 2 || $ticketStatus == 8) && $tStatus == 4) {
            $field[] = 'ticketExpectPrizeAmount="' . $database->escape($ticketExpectPrizeAmount) . '"';
        }
        if (($ticketStatus == 2 || $ticketStatus == 8) && $tStatus == 3 && $ticketPrizeDivideStatus == 1) {
            $field[] = 'ticketPrizeDivideStatus=3';
        }
        $field[] = 'planMatchRecommend="' . $database->escape($planMatchRecommend) . '"';
        $sqlArr[] = 'update t_order set ' . implode(',', $field) . ' where orderId="' . $orderId . '" and orderType=3 and status="'.$database->escape($status).'" and ticketStatus="'.$database->escape($ticketStatus).'" limit 1';
        //更新出票表(matchRecommend)比赛开奖信息
        //出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
        $planMatchRecommend = json_decode($planMatchRecommend);
        if ($ticketSupplierId > 0 && ($tStatus == 3 || $tStatus == 4) && !empty($planMatchRecommend) && is_array($ticketList) && $ticketLength > 0) {
            $matchRecommendMap = array();
            foreach ($planMatchRecommend as $mr) {
                $matchId = (int)$mr->matchId;
                $oddsId = (int)$mr->oddsId;
                if ($matchId <= 0 || $oddsId <= 0) {
                    continue;
                }
                $matchRecommendMap[$matchId.'-'.$oddsId] = $mr;
            }
            foreach ($ticketList as $ticket) {
                $tId = (int)$ticket['ticketId'];
                $matchRecommend = json_decode(trim($ticket['matchRecommend']));
                if ($tId <= 0 || empty($matchRecommend)) {
                    continue;
                }
                foreach ($matchRecommend as &$mr) {
                    $matchId = (int)$mr->matchId;
                    $oddsId = (int)$mr->oddsId;
                    $item = $matchRecommendMap[$matchId.'-'.$oddsId];
                    if ($matchId <= 0 || $oddsId <= 0 || empty($item)) {
                        continue;
                    }
                    $mr->prize = $item->prize;
                    $mr->bettypeResult = $item->bettypeResult;
                    $mr->bettypePrize = $item->bettypePrize;
                }
                $matchRecommend = json_encode($matchRecommend);
                if (!empty($matchRecommend)) {
                    $sqlArr[] = 'update t_ticket set matchRecommend="' . $database->escape($matchRecommend) .'" where ticketId="' . $tId . '" limit 1';
                }
            }
        }
        if (count($sqlArr) > 0) {
            $sql = implode(';', $sqlArr);
            $result = $database->multiExecute($sql);
            $database->multiFree();
            if (!$result) {
                $database->close();
                $resp->msg = "sql执行失败";
                return $resp;
            }
        }
        $database->close();
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

    public function ticketPrizeAmount() {
        $param = array();
        $param['needTicketSupplier'] = true;
        $param['nullTicketPrizeAmount'] = true;
        $param['orderType'] = array(3,9);//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=竞彩出票订单, 4=彩金充值订单, 5=晒米冷热订单, 6=极限追盘订单, 7=数字彩出票订单, 8=赠送订单, 9=冠亚军竞猜订单
        $param['status'] = array(2,4); //订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        $param['ticketStatus'] = array(4,6);//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
        $param['pageNum'] = 1;
        $param['pageSize'] = 1000;
        $selectOrderResp = $this->orderService->selectOrder($param);
        if ($selectOrderResp->errCode != 0) {
            $this->common->logger->info('订单查询异常');
            return;
        }
        $orderList = $selectOrderResp->data['list'];
        for ($i = 0, $length = count($orderList); $i < $length; $i++) {
            $order = $orderList[$i];
            $orderId = (int)$order['orderId'];
            $orderType = (int)$order['orderType'];
            $status = (int)$order['status'];//订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
            $amount = (int)$order['amount'];
            $ticketStatus = (int)$order['ticketStatus'];//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
            $ticketUnit = (int)$order['ticketUnit'];
            $ticketMultiple = (int)$order['ticketMultiple'];
            $ticketPrizeAmount = (int)$order['ticketPrizeAmount'];
            $ticketSupplierId = (int)$order['ticketSupplierId'];
            if (empty($order) || $orderId <= 0 || ($orderType != 3 && $orderType != 9) || ($status != 2 && $status != 4) || $amount <= 0 || ($ticketStatus != 4 && $ticketStatus != 6) || $ticketUnit <= 0 || $ticketMultiple <= 0 || $ticketPrizeAmount != 0 || $ticketSupplierId <= 0) {
                continue;
            }
            $doTicketPrizeAmountResp = $this->doTicketPrizeAmount($orderId);
            if ($doTicketPrizeAmountResp->errCode != 0) {
                $this->common->logger->info('竞技彩订单设置中奖金额失败('.$orderId.')：'.$doTicketPrizeAmountResp->msg);
            } else {
                $this->common->logger->info('竞技彩订单设置中奖金额成功('.$orderId.')');
            }
        }
        $this->common->logger->info('竞技彩订单设置中奖金额完成('.count($orderList).')');
    }

    public function doTicketPrizeAmount($orderId) {
        $resp = requireModule('Resp');
        $orderId = (int)$orderId;
        if ($orderId <= 0) {
            $resp->msg = "orderId参数有误";
            return $resp;
        }
        $selectOrderByIdResp = $this->orderService->selectOrderById($orderId);
        if ($selectOrderByIdResp->errCode != 0) {
            $resp->msg = "查询订单异常";
            return $resp;
        }
        $order = $selectOrderByIdResp->data;
        if (empty($order)) {
            $resp->msg = "订单数据异常";
            return $resp;
        }
        $orderId = (int)$order['orderId'];
        $orderType = (int)$order['orderType'];
        $status = (int)$order['status'];//订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        $amount = (int)$order['amount'];
        $ticketStatus = (int)$order['ticketStatus'];//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
        $ticketUnit = (int)$order['ticketUnit'];
        $ticketMultiple = (int)$order['ticketMultiple'];
        $ticketPrizeAmount = (int)$order['ticketPrizeAmount'];
        $ticketSupplierId = (int)$order['ticketSupplierId'];
        if ($orderId <= 0) {
            $resp->msg = "订单id异常";
            return $resp;
        }
        if ($orderType != 3 && $orderType != 9) {
            $resp->msg = "订单类型异常";
            return $resp;
        }
        if ($status != 2 && $status != 4) {
            $resp->msg = "订单状态异常";
            return $resp;
        }
        if ($amount <= 0) {
            $resp->msg = "订单金额异常";
            return $resp;
        }
        if ($ticketStatus != 4 && $ticketStatus != 6) {
            $resp->msg = "出票状态异常";
            return $resp;
        }
        if ($ticketUnit <= 0) {
            $resp->msg = "注数异常";
            return $resp;
        }
        if ($ticketMultiple <= 0) {
            $resp->msg = "倍数异常";
            return $resp;
        }
        if ($ticketPrizeAmount != 0) {
            $resp->msg = "奖金已被设置";
            return $resp;
        }
        if ($ticketSupplierId <= 0) {
            $resp->msg = "出票商id异常";
            return $resp;
        }
        $ticketList = array();
        if ($ticketSupplierId > 0) {
            $param = array();
            $param['orderId'] = $orderId;
            $param['needSport'] = true;
            $selectTicketResp = $this->ticketService->selectTicket($param);
            if ($selectTicketResp->errCode != 0) {
                $this->common->logger->info('票查询异常');
                $resp->msg = "票查询异常";
                return $resp;
            }
            $ticketList = $selectTicketResp->data['list'];
        }
        $ticketLength = count($ticketList);
        $errorLength = 0;
        $successLength = 0;
        $lostLength = 0;//未中奖票数
        $winLength = 0;//已中奖票数
        if (!is_array($ticketList) || $ticketLength <= 0) {
            $this->common->logger->info('票查询异常(orderId='.$orderId.')');
            $resp->msg = '票查询异常(orderId='.$orderId.')';
            return $resp;
        }
        $ticketCountAmount = 0;
        $ticketCountPrizeAmount = 0;
        foreach ($ticketList as $ticket) {
            $ts = (int)$ticket['status'];//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已撤单
            $ta = (int)$ticket['amount'];
            $tpa = (int)$ticket['prizeAmount'];
            $ticketCountAmount += $ta;
            if ($ts == 1 || $ts == 5) {
                $errorLength++;
            } else if ($ts == 2 || $ts == 3 || $ts == 4) {
                $successLength++;
                if ($ts == 3) {
                    $lostLength++;
                } else if ($ts == 4) {
                    $winLength++;
                    $ticketCountPrizeAmount += $tpa;
                }
            }
        }
        if ($ticketCountAmount != $amount || $ticketLength != ($successLength + $errorLength)) {
            $this->common->logger->info('订单和票信息不符(orderId='.$orderId.')');
            $resp->msg = '订单和票信息不符(orderId='.$orderId.')';
            return $resp;
        }
        if ($successLength != ($lostLength + $winLength)) {//确认出票成功的都已经开奖
            $this->common->logger->info('成功的票和开奖的票数量不符(orderId='.$orderId.')');
            $resp->msg = '成功的票和开奖的票数量不符(orderId='.$orderId.')';
            return $resp;
        }
        if ($ticketCountPrizeAmount <= 0) {
            $this->common->logger->info('未获取票中奖金额(orderId='.$orderId.')');
            $resp->msg = '未获取票中奖金额(orderId='.$orderId.')';
            return $resp;
        }
        $database = requireModule("Database");
        $field = array();
        $field[] = 'ticketPrizeAmount="' . $database->escape($ticketCountPrizeAmount) . '"';
        $sql = 'update t_order set ' . implode(',', $field) . ' where orderId="' . $orderId . '" and orderType="'.$database->escape($orderType).'" and status="'.$database->escape($status).'" and ticketPrizeAmount=0 and ticketStatus="'.$database->escape($ticketStatus).'" limit 1';
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = "sql执行失败";
            return $resp;
        }
        $database->close();
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

    public function planPrizeStatus() {
        $param = array();
        $param['playType'] = 1;//1=竞技彩方案, 2=数字彩方案
        $param['orderType'] = 0;//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=出票订单
        $param['status'] = 2; //订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        $param['planPrizeStatus'] = 0;//方案中奖状态, 0=未开奖, 1=已中奖, 2=未中奖
        $param['pageNum'] = 1;
        $param['pageSize'] = 1000;
        $selectOrderResp = $this->orderService->selectOrder($param);
        if ($selectOrderResp->errCode != 0) {
            $this->common->logger->info('订单查询异常');
            return;
        }
        $orderList = $selectOrderResp->data['list'];
        $this->common->logger->info(count($orderList).'个竞技彩方案订单参与算奖');
        $orderList = $this->commonService->setMatchList($orderList, 'planMatchRecommend');
        for ($i = 0, $length = count($orderList); $i < $length; $i++) {
            $order = $orderList[$i];
            $planType = (int)$order['planType'];
            $orderId = (int)$order['orderId'];
            $orderType = (int)$order['orderType'];
            $status = (int)$order['status'];//订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
            $planMatchRecommend = trim($order['planMatchRecommend']);
            $matchList = $order['matchList'];
            if (empty($order) || $planType != 1 || $orderId <= 0 ||  $orderType != 0 || $status != 2 || empty($planMatchRecommend) || empty($matchList) || count($matchList) <= 0) {
                continue;
            }
            $doPlanPrizeStatusResp = $this->doPlanPrizeStatus($orderId);
            if ($doPlanPrizeStatusResp->errCode != 0) {
                $this->common->logger->info('竞技彩方案订单算奖失败('.$orderId.')：'.$doPlanPrizeStatusResp->msg);
            } else {
                $this->common->logger->info('竞技彩方案订单算奖成功('.$orderId.')');
            }
        }
        $this->common->logger->info('竞技彩方案订单算奖完成('.count($orderList).')');
    }

    public function doPlanPrizeStatus($orderId) {
        $resp = requireModule('Resp');
        $orderId = (int)$orderId;
        if ($orderId <= 0) {
            $resp->msg = "orderId参数有误";
            return $resp;
        }
        $selectOrderByIdResp = $this->orderService->selectOrderById($orderId);
        if ($selectOrderByIdResp->errCode != 0) {
            $resp->msg = "查询订单异常";
            return $resp;
        }
        $order = $selectOrderByIdResp->data;
        if (empty($order)) {
            $resp->msg = "订单数据异常";
            return $resp;
        }
        $order = $this->commonService->setMatchList(array($order), 'planMatchRecommend')[0];
        $planType = (int)$order['planType'];
        $orderId = (int)$order['orderId'];
        $orderType = (int)$order['orderType'];
        $status = (int)$order['status'];//订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        $planPrizeStatus = (int)$order['planPrizeStatus'];//方案中奖状态, 0=未开奖, 1=已中奖, 2=未中奖
        $planMatchRecommend = trim($order['planMatchRecommend']);
        $matchList = $order['matchList'];
        if ($planType != 1) {
            $resp->msg = "方案类型异常";
            return $resp;
        }
        if ($orderId <= 0) {
            $resp->msg = "订单id异常";
            return $resp;
        }
        if ($orderType != 0) {
            $resp->msg = "订单类型异常";
            return $resp;
        }
        if ($status != 2) {
            $resp->msg = "订单状态异常";
            return $resp;
        }
        if ($planPrizeStatus != 0) {
            $resp->msg = "方案中奖状态异常";
            return $resp;
        }
        if (empty($planMatchRecommend) || empty($matchList) || count($matchList) <= 0) {
            $resp->msg = "比赛推荐异常";
            return $resp;
        }
        $calculatePrizeResp = $this->commonService->calculatePrize($planMatchRecommend, $matchList);
        if ($calculatePrizeResp->errCode != 0 || empty($calculatePrizeResp->data)) {
            $this->common->logger->info($calculatePrizeResp->msg.'(orderId='.$orderId.')');
            $resp->msg = $calculatePrizeResp->msg.'(orderId='.$orderId.')';
            return $resp;
        }
        $planPrizeStatus = (int)$calculatePrizeResp->data['prizeStatus'];
        $planMatchRecommend = trim($calculatePrizeResp->data['matchRecommend']);
        if (empty($planMatchRecommend)) {
            $resp->msg = '算奖后赛事异常';
            return $resp;
        }
        $database = requireModule("Database");
        $field = array();
        $field[] = 'planPrizeStatus="' . $database->escape($planPrizeStatus) . '"';
        $field[] = 'planMatchRecommend="' . $database->escape($planMatchRecommend) . '"';
        $sql = 'update t_order set ' . implode(',', $field) . ' where orderId="' . $orderId . '" and orderType=0 and status=2 and planType=1 and planPrizeStatus=0 limit 1';
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = "sql执行失败";
            return $resp;
        }
        $database->close();
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

    /********************************************************************* 竞彩和数字彩分割线  **************************************************************************/
    
    public function digitalTicketStatus() {
        $param = array();
        $param['orderType'] = 7;//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=竞彩出票订单, 4=彩金充值订单, 5=晒米冷热订单, 6=极限追盘订单, 7=数字彩出票订单
        $param['status'] = array(2,4); //订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        $param['ticketStatus'] = array(0,2,7,8);//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
        $param['pageNum'] = 1;
        $param['pageSize'] = 1000;
        $selectOrderResp = $this->orderService->selectOrder($param);
        if ($selectOrderResp->errCode != 0) {
            $this->common->logger->info('订单查询异常');
            return;
        }
        $orderList = $selectOrderResp->data['list'];
        $this->common->logger->info(count($orderList).'个数字彩出票订单参与算奖');
        $orderList = $this->commonService->setLotteryIssue($orderList);
        for ($i = 0, $length = count($orderList); $i < $length; $i++) {
            $order = $orderList[$i];
            $orderId = (int)$order['orderId'];
            $orderType = (int)$order['orderType'];
            $status = (int)$order['status'];//订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
            $amount = (int)$order['amount'];
            $ticketStatus = (int)$order['ticketStatus'];//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
            $ticketUnit = (int)$order['ticketUnit'];
            $ticketMultiple = (int)$order['ticketMultiple'];
            $ticketSupplierId = (int)$order['ticketSupplierId'];
            $lotteryId = trim($order['lotteryId']);
            $issue = trim($order['issue']);
            $betContent = trim($order['betContent']);
            $lotteryIssue = $order['lotteryIssue'];
            $endTime = strtotime(trim($lotteryIssue['endTime']));
            if (empty($order) || $orderId <= 0 || $orderType != 7 || ($status != 2 && $status != 4) || $amount <= 0 || ($ticketStatus != 0 && $ticketStatus != 2 && $ticketStatus != 7 && $ticketStatus != 8) || $ticketUnit <= 0 || $ticketMultiple <= 0 || empty($lotteryId) || empty($issue) || empty($betContent) || empty($lotteryIssue) || $endTime <= 0) {
                continue;
            }
            $doDigitalTicketStatusResp = $this->doDigitalTicketStatus($orderId);
            if ($doDigitalTicketStatusResp->errCode != 0) {
                $this->common->logger->info('数字彩订单算奖失败('.$orderId.')：'.$doDigitalTicketStatusResp->msg);
            } else {
                $this->common->logger->info('数字彩订单算奖成功('.$orderId.')');
            }
        }
        $this->common->logger->info('数字彩订单算奖完成('.count($orderList).')');
    }

    public function doDigitalTicketStatus($orderId) {
        $resp = requireModule('Resp');
        $orderId = (int)$orderId;
        if ($orderId <= 0) {
            $resp->msg = "orderId参数有误";
            return $resp;
        }
        $selectOrderByIdResp = $this->orderService->selectOrderById($orderId);
        if ($selectOrderByIdResp->errCode != 0) {
            $resp->msg = "查询订单异常";
            return $resp;
        }
        $order = $selectOrderByIdResp->data;
        if (empty($order)) {
            $resp->msg = "订单数据异常";
            return $resp;
        }
        $order = $this->commonService->setLotteryIssue(array($order))[0];
        $orderId = (int)$order['orderId'];
        $orderType = (int)$order['orderType'];
        $status = (int)$order['status'];//订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        $amount = (int)$order['amount'];
        $ticketStatus = (int)$order['ticketStatus'];//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
        $ticketAppend = (int)$order['ticketAppend'];//是否追号, 0=不追号, 1=是追号(大乐透)
        $ticketUnit = (int)$order['ticketUnit'];
        $ticketMultiple = (int)$order['ticketMultiple'];
        $ticketSupplierId = (int)$order['ticketSupplierId'];
        $lotteryId = trim($order['lotteryId']);
        $issue = trim($order['issue']);
        $betContent = trim($order['betContent']);
        $lotteryIssue = $order['lotteryIssue'];
        $ticketAttachPrizeStatus = (int)$order['ticketAttachPrizeStatus']; //加奖状态, 0=不加奖, 1=待加奖, 2=已加奖, 3=未加奖
        $ticketPrizeDivideStatus = (int)$order['ticketPrizeDivideStatus'];//中奖分成状态, 0=不分成, 1=待分成, 2=已分成, 3=未分成
        $beginTime = (int)strtotime(trim($lotteryIssue['beginTime']));
        $endTime = (int)strtotime(trim($lotteryIssue['endTime']));
        if ($orderId <= 0) {
            $resp->msg = "订单id异常";
            return $resp;
        }
        if ($orderType != 7) {
            $resp->msg = "订单类型异常";
            return $resp;
        }
        if ($status != 2 && $status != 4) {
            $resp->msg = "订单状态异常";
            return $resp;
        }
        if ($amount <= 0) {
            $resp->msg = "订单金额异常";
            return $resp;
        }
        if ($ticketStatus != 0 && $ticketStatus != 2 && $ticketStatus != 7 && $ticketStatus != 8) {
            $resp->msg = "出票状态异常";
            return $resp;
        }
        if ($ticketUnit <= 0) {
            $resp->msg = "注数异常";
            return $resp;
        }
        if ($ticketMultiple <= 0) {
            $resp->msg = "倍数异常";
            return $resp;
        }
        if (empty($lotteryId)) {
            $resp->msg = "彩种异常";
            return $resp;
        }
        if (empty($issue) || empty($lotteryIssue) || $beginTime <= 0 || $endTime <= 0) {
            $resp->msg = "期号异常";
            return $resp;
        }
        if (empty($betContent)) {
            $resp->msg = "投注格式异常";
            return $resp;
        }
        $ticketList = array();
        if ($ticketSupplierId > 0) {
            $param = array();
            $param['orderId'] = $orderId;
            $param['needDigital'] = true;
            $selectTicketResp = $this->ticketService->selectTicket($param);
            if ($selectTicketResp->errCode != 0) {
                $this->common->logger->info('票查询异常');
                $resp->msg = "票查询异常";
                return $resp;
            }
            $ticketList = $selectTicketResp->data['list'];
        }
        $ticketSupplier = null;
        if ($ticketSupplierId == 1) {
            $ticketSupplier = requireModule('ZongGuan');
            $lottery = $ticketSupplier->lotteryMap[$lotteryId];
            $endTimeOffset = (int)$lottery['endTimeOffset'];
            if (!empty($lottery)) {
                $endTime -= $endTimeOffset;
            }
        }
        if ($ticketSupplierId > 0 && empty($ticketSupplier)) {
            $resp->msg = "出票商类异常";
            return $resp;
        }
        $curTime = time();
        $ticketLength = count($ticketList);
        $errorLength = 0;
        $successLength = 0;
        $successMultipleMap = array();//出票成功倍数
        if ($ticketSupplierId > 0) {
            if (is_array($ticketList) && $ticketLength > 0) {
                $ticketCountAmount = 0;
                foreach ($ticketList as $ticket) {
                    $tId = (int)$ticket['ticketId'];
                    $ts = (int)$ticket['status'];//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已撤单
                    $ta = (int)$ticket['amount'];
                    $tm = (int)$ticket['multiple'];
                    $tbt = trim($ticket['betType']);
                    $tbc = trim($ticket['betContent']);//不要校验empty($tbc)，因为福彩3D的"直选和值"可以是0
                    if ($tId <= 0 || $ta <= 0 || $tm <= 0 || empty($tbt)) {
                        $this->common->logger->info('票内容异常(ticketId='.$tId.')');
                        $resp->msg = '票内容异常(ticketId='.$tId.')';
                        return $resp;
                    }
                    $ticketCountAmount += $ta;
                    $separateBetContentResp = $ticketSupplier->separateBetContent($lotteryId, $tbt, $tbc);
                    if ($separateBetContentResp->errCode != 0) {
                        $this->common->logger->info('票分离异常(ticketId='.$tId.')');
                        $resp->msg = '票分离异常(ticketId='.$tId.')';
                        return $resp;
                    }
                    $betContentItem = $separateBetContentResp->data;
                    if (!is_array($betContentItem) || count($betContentItem) <= 0) {
                        $this->common->logger->info('票投注格式异常(ticketId='.$tId.')');
                        $resp->msg = '票投注格式异常(ticketId='.$tId.')';
                        return $resp;
                    }
                    if ($ts == 1 || $ts == 5) {
                        $errorLength++;
                    } else if ($ts == 2 || $ts == 3 || $ts == 4) {
                        $successLength++;
                        foreach ($betContentItem as $content) {
                            $content = trim($content);
                            $contentMd5 = md5($content);
                            //记录种投注成功的倍数
                            if (!key_exists($contentMd5, $successMultipleMap)) {
                                $successMultipleMap[$contentMd5] = 0;
                            }
                            //存在相同投注(99倍拆票)
                            $successMultipleMap[$contentMd5] += $tm;
                        }
                    }
                }
                if ($ticketCountAmount != $amount) {
                    $this->common->logger->info('订单和票信息不符(orderId='.$orderId.')');
                    $resp->msg = '订单和票信息不符(orderId='.$orderId.')';
                    return $resp;
                }
            }
        }
        $tStatus = null;//等待设置的票状态
        $prizeLevelArr = array();
        $ticketExpectPrizeAmount = 0;
        $setTicketAttachPrizeAmount = 0;    //设置加奖金额
        if ($ticketStatus == 0) {
            if ($curTime >= $endTime) {
                $tStatus = 1;
            }
        } else if ($ticketStatus == 7) {
            if ($ticketSupplierId > 0 && $ticketLength > 0) {
                if ($ticketLength == $errorLength) {
                    $tStatus = 1;
                } else if ($ticketLength == $successLength) {
                    $tStatus = 2;
                } else if ($ticketLength == ($successLength + $errorLength)) {
                    $tStatus = 8;
                }
            }
        } else if ($ticketStatus == 2 || $ticketStatus == 8) {
            $calculateDigitalTicketResp = $this->commonService->calculateDigitalTicket($lotteryId, $betContent);
            if ($calculateDigitalTicketResp->errCode != 0) {
                $this->common->logger->info('拆票异常(orderId='.$orderId.')：'.$calculateDigitalTicketResp->msg);
                $resp->msg = '拆票异常(orderId='.$orderId.')：'.$calculateDigitalTicketResp->msg;
                return $resp;
            }
            $ticketArr = $calculateDigitalTicketResp->data;
            if (!is_array($ticketArr) || count($ticketArr) <= 0) {
                $this->common->logger->info('票投注格式异常(orderId='.$orderId.')');
                $resp->msg = '票投注格式异常(orderId='.$orderId.')';
                return $resp;
            }
            $betContentArr = array();//分离出平台和出票商之间"最简"的投注格式
            $manualMultipleMap = array();//人工票倍数统计
            $countTicketUnit = 0;
            foreach ($ticketArr as $item) {
                $unit = (int)$item['ticketUnit'];
                $content = trim($item['betContent']);
                $contentItem = $item['betContentItem'];                        //福彩3d的"直选和值"和"组三"的注数不等于betContentItem数组长度
                if ($unit <= 0 || empty($content) || !is_array($contentItem) || ($lotteryId != 'FC3D' && $unit != count($contentItem))) {
                    $this->common->logger->info('票异常');
                    $resp->msg = '票异常';
                    return $resp;
                }
                $countTicketUnit += $unit;
                if ($lotteryId == 'SSQ' || $lotteryId == 'DLT') {
                    $betContentArr[] = $content;
                    //--人工票的倍数
                    $contentMd5 = md5($content);
                    if (!key_exists($contentMd5, $manualMultipleMap)) {
                        $manualMultipleMap[$contentMd5] = 0;
                    }
                    $manualMultipleMap[$contentMd5] += $ticketMultiple;
                } else if ($lotteryId == 'JSK3' || $lotteryId == 'GX11X5' || $lotteryId == 'FC3D') {
                    foreach ($contentItem as $item) {
                        $betContentArr[] = $item;
                        //--人工票的倍数
                        $contentMd5 = md5($item);
                        if (!key_exists($contentMd5, $manualMultipleMap)) {
                            $manualMultipleMap[$contentMd5] = 0;
                        }
                        $manualMultipleMap[$contentMd5] += $ticketMultiple;
                    }
                }
            }
            $betContentArr = array_unique($betContentArr);
            $betContentLength = count($betContentArr);
            if ($betContentLength <= 0) {
                $this->common->logger->info('订单投注格式为空');
                $resp->msg = '订单投注格式为空';
                return $resp;
            }
            $countWinPrizeStatus = 0;
            $countLostPrizeStatus = 0;
            foreach ($betContentArr as $bContent) {
                $calculateDigitalPrizeResp = $this->commonService->calculateDigitalPrize($lotteryId, $bContent, $lotteryIssue, $ticketAppend);
                if ($calculateDigitalPrizeResp->errCode != 0) {
                    $resp->msg = $calculateDigitalPrizeResp->msg;
                    return $resp;
                }
                $prizeList = $calculateDigitalPrizeResp->data;
                $prize = $prizeList[0];
                if (!is_array($prizeList) || count($prizeList) != 1 || $bContent != $prize['betContent']) {
                    $this->common->logger->info('数字彩算奖异常');
                    $resp->msg = '数字彩算奖异常';
                    return $resp;
                }
                $prizeStatus = (int)$prize['prizeStatus'];
                $prizeLevel = trim($prize['prizeLevel']);
                $prizeAmount = (int)$prize['prizeAmount'];
                $prizeBetType = trim($prize['betContentResult']['type']);
                $successMultiple = 0;
                if ($ticketSupplierId > 0) {
                    $formatBetContentResp = $ticketSupplier->formatBetContent($lotteryId, $bContent);
                    $formatData = $formatBetContentResp->data;
                    if ($formatBetContentResp->errCode != 0 || empty($formatData)) {
                        $this->common->logger->info('出票格式转换异常');
                        $resp->msg = '出票格式转换异常';
                        return $resp;
                    }
                    $ticketBetType = trim($formatData['betType']);
                    $ticketBetContent = trim($formatData['betContent']);
                    $contentMd5 = md5($ticketBetType.':'.$ticketBetContent);
                    $successMultiple = (int)$successMultipleMap[$contentMd5];//电子票
                } else {
                    $contentMd5 = md5($bContent);
                    $successMultiple = (int)$manualMultipleMap[$contentMd5];//店长票
                }
                if ($prizeStatus == 1) {
                    $prizeLevelArr[] = $prizeLevel;
                    $countWinPrizeStatus++;
                    $ticketExpectPrizeAmount += $prizeAmount * $successMultiple;
                    //11选5加奖(任3或任5)
                    if ($lotteryId == 'GX11X5' && $ticketAttachPrizeStatus == 1) {
                        if ($prizeBetType == 'RX3') {
                            $setTicketAttachPrizeAmount += 200 * $successMultiple;    //任三加2元
                        } else if ($prizeBetType == 'RX5') {
                            $setTicketAttachPrizeAmount += 6000 * $successMultiple;    //任五加60元
                        }
                    }
                } else if ($prizeStatus == 2) {
                    $countLostPrizeStatus++;
                }
            }
            if ($ticketUnit != $countTicketUnit) {
                $this->common->logger->info('订单注数和赛事注数不符');
                $resp->msg = '订单注数和赛事注数不符';
                return $resp;
            }
            if ($betContentLength != ($countWinPrizeStatus + $countLostPrizeStatus)) {
                //确保所有投注全部算奖
                $resp->msg = '投注还未全部算奖';
                return $resp;
            }
            if ($ticketStatus == 2) {
                if ($ticketSupplierId > 0) {
                    if ($ticketLength > 0 && $ticketLength == $successLength) {
                        if ($countWinPrizeStatus > 0) {
                            $tStatus = 4;
                        } else if ($betContentLength == $countLostPrizeStatus) {
                            $tStatus = 3;
                        }
                    }
                } else {
                    if ($countWinPrizeStatus > 0) {
                        $tStatus = 4;
                    } else if ($betContentLength == $countLostPrizeStatus) {
                        $tStatus = 3;
                    }
                }
            } else if ($ticketStatus == 8) {
                if ($ticketSupplierId > 0 && $status == 4 && $ticketLength > 0 && $ticketLength > $successLength) {
                    //"部分出票"的订单，需要等订单"部分退款"后才能算奖
                    //确认出票成功的都已经开奖
                    if ($countWinPrizeStatus > 0) {
                        $tStatus = 4;
                    } else if ($betContentLength == $countLostPrizeStatus) {
                        $tStatus = 3;
                    }
                }
            }
        }
        if ($tStatus === null) {
            $resp->msg = "不符合状态设置";
            return $resp;
        }
        $database = requireModule("Database");
        $msg = null;
        $field = array();
        $field[] = 'ticketStatus="' . $database->escape($tStatus) . '"';
        if (($ticketStatus == 2 || $ticketStatus == 8) && $tStatus == 4 && count($prizeLevelArr) > 0) {
            $prizeLevel = min($prizeLevelArr);
            if ($lotteryId == 'SSQ' && ($prizeLevel == 1 || $prizeLevel == 2)) {
                //中奖审核状态, 0=不审核, 1=待审核, 2=已审核
                $field[] = 'ticketPrizeVerifyStatus="1"';//大奖待审核
                //模版消息
                $prizeName = '';
                if ($prizeLevel == 1) {
                    $prizeName = '一等奖';
                } else if ($prizeLevel == 2) {
                    $prizeName = '二等奖';
                }
                $msg = array('orderId' => $orderId, 'title' => '平台大奖审核通知', 'content' => '双色球'.$prizeName);
            } else if ($lotteryId == 'DLT' && ($prizeLevel == 1 || $prizeLevel == 2 || $prizeLevel == 3)) {
                //中奖审核状态, 0=不审核, 1=待审核, 2=已审核
                $field[] = 'ticketPrizeVerifyStatus="1"';//大奖待审核
                //模版消息
                $prizeName = '';
                if ($prizeLevel == 1) {
                    $prizeName = '一等奖';
                } else if ($prizeLevel == 2) {
                    $prizeName = '二等奖';
                } else if ($prizeLevel == 3) {
                    $prizeName = '三等奖';
                }
                if ($ticketAppend == 1) {
                    $prizeName .= '追加';
                }
                $msg = array('orderId' => $orderId, 'title' => '平台大奖审核通知', 'content' => '大乐透'.$prizeName);
            } else if ($lotteryId == 'GX11X5' && $setTicketAttachPrizeAmount > 0) {
                //加奖金额
                $field[] = 'ticketAttachPrizeAmount="' . $database->escape($setTicketAttachPrizeAmount) . '"';
            }
            $field[] = 'ticketExpectPrizeAmount="' . $database->escape($ticketExpectPrizeAmount) . '"';
        }
        if (($ticketStatus == 2 || $ticketStatus == 8) && $tStatus == 3 && $ticketPrizeDivideStatus == 1) {
            $field[] = 'ticketPrizeDivideStatus=3';
        }
        $sql = 'update t_order set ' . implode(',', $field) . ' where orderId="' . $orderId . '" and orderType=7 and status="'.$database->escape($status).'" and ticketStatus="'.$database->escape($ticketStatus).'" and ticketAttachPrizeStatus="'.$database->escape($ticketAttachPrizeStatus).'" limit 1';
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = "sql执行失败";
            return $resp;
        }
        $database->close();
        if (!empty($msg)) {
            $this->sendMsg($msg);
        }
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

    public function digitalTicketPrizeAmount() {
        $param = array();
        $param['needTicketSupplier'] = true;
        $param['nullTicketPrizeAmount'] = true;
        $param['orderType'] = 7;//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=竞彩出票订单, 4=彩金充值订单, 5=晒米冷热订单, 6=极限追盘订单, 7=数字彩出票订单
        $param['status'] = array(2,4); //订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        $param['ticketStatus'] = 4;//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
        $param['pageNum'] = 1;
        $param['pageSize'] = 1000;
        $selectOrderResp = $this->orderService->selectOrder($param);
        if ($selectOrderResp->errCode != 0) {
            $this->common->logger->info('订单查询异常');
            return;
        }
        $orderList = $selectOrderResp->data['list'];
        for ($i = 0, $length = count($orderList); $i < $length; $i++) {
            $order = $orderList[$i];
            $orderId = (int)$order['orderId'];
            $orderType = (int)$order['orderType'];
            $status = (int)$order['status'];//订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
            $amount = (int)$order['amount'];
            $ticketStatus = (int)$order['ticketStatus'];//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
            $ticketMultiple = (int)$order['ticketMultiple'];
            $ticketPrizeAmount = (int)$order['ticketPrizeAmount'];
            $ticketSupplierId = (int)$order['ticketSupplierId'];
            if (empty($order) || $orderId <= 0 || $orderType != 7 || ($status != 2 && $status != 4) || $amount <= 0 || $ticketStatus != 4 || $ticketMultiple <= 0 || $ticketPrizeAmount != 0 || $ticketSupplierId <= 0) {
                continue;
            }
            $doDigitalTicketPrizeAmountResp = $this->doDigitalTicketPrizeAmount($orderId);
            if ($doDigitalTicketPrizeAmountResp->errCode != 0) {
                $this->common->logger->info('数字彩订单设置中奖金额失败('.$orderId.')：'.$doDigitalTicketPrizeAmountResp->msg);
            } else {
                $this->common->logger->info('数字彩订单设置中奖金额成功('.$orderId.')');
            }
        }
        $this->common->logger->info('数字彩订单设置中奖金额完成('.count($orderList).')');
    }

    public function doDigitalTicketPrizeAmount($orderId) {
        $resp = requireModule('Resp');
        $orderId = (int)$orderId;
        if ($orderId <= 0) {
            $resp->msg = "orderId参数有误";
            return $resp;
        }
        $selectOrderByIdResp = $this->orderService->selectOrderById($orderId);
        if ($selectOrderByIdResp->errCode != 0) {
            $resp->msg = "查询订单异常";
            return $resp;
        }
        $order = $selectOrderByIdResp->data;
        if (empty($order)) {
            $resp->msg = "订单数据异常";
            return $resp;
        }
        $orderId = (int)$order['orderId'];
        $orderType = (int)$order['orderType'];
        $status = (int)$order['status'];//订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        $amount = (int)$order['amount'];
        $ticketStatus = (int)$order['ticketStatus'];//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
        $ticketUnit = (int)$order['ticketUnit'];
        $ticketMultiple = (int)$order['ticketMultiple'];
        $ticketPrizeAmount = (int)$order['ticketPrizeAmount'];
        $ticketSupplierId = (int)$order['ticketSupplierId'];
        if ($orderId <= 0) {
            $resp->msg = "订单id异常";
            return $resp;
        }
        if ($orderType != 7) {
            $resp->msg = "订单类型异常";
            return $resp;
        }
        if ($status != 2 && $status != 4) {
            $resp->msg = "订单状态异常";
            return $resp;
        }
        if ($amount <= 0) {
            $resp->msg = "订单金额异常";
            return $resp;
        }
        if ($ticketStatus != 4) {
            $resp->msg = "出票状态异常";
            return $resp;
        }
        if ($ticketUnit <= 0) {
            $resp->msg = "注数异常";
            return $resp;
        }
        if ($ticketMultiple <= 0) {
            $resp->msg = "倍数异常";
            return $resp;
        }
        if ($ticketPrizeAmount != 0) {
            $resp->msg = "奖金已被设置";
            return $resp;
        }
        if ($ticketSupplierId <= 0) {
            $resp->msg = "出票商id异常";
            return $resp;
        }
        $ticketList = array();
        if ($ticketSupplierId > 0) {
            $param = array();
            $param['orderId'] = $orderId;
            $param['needDigital'] = true;
            $selectTicketResp = $this->ticketService->selectTicket($param);
            if ($selectTicketResp->errCode != 0) {
                $this->common->logger->info('票查询异常');
                $resp->msg = "票查询异常";
                return $resp;
            }
            $ticketList = $selectTicketResp->data['list'];
        }
        $ticketLength = count($ticketList);
        $errorLength = 0;
        $successLength = 0;
        $lostLength = 0;//未中奖票数
        $winLength = 0;//已中奖票数
        if (!is_array($ticketList) || $ticketLength <= 0) {
            $this->common->logger->info('票查询异常(orderId='.$orderId.')');
            $resp->msg = '票查询异常(orderId='.$orderId.')';
            return $resp;
        }
        $ticketCountAmount = 0;
        $ticketCountPrizeAmount = 0;
        foreach ($ticketList as $ticket) {
            $ts = (int)$ticket['status'];//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已撤单
            $ta = (int)$ticket['amount'];
            $tpa = (int)$ticket['prizeAmount'];
            $ticketCountAmount += $ta;
            if ($ts == 1 || $ts == 5) {
                $errorLength++;
            } else if ($ts == 2 || $ts == 3 || $ts == 4) {
                $successLength++;
                if ($ts == 3) {
                    $lostLength++;
                } else if ($ts == 4) {
                    $winLength++;
                    $ticketCountPrizeAmount += $tpa;
                }
            }
        }
        if ($ticketCountAmount != $amount || $ticketLength != ($successLength + $errorLength)) {
            $this->common->logger->info('订单和票信息不符(orderId='.$orderId.')');
            $resp->msg = '订单和票信息不符(orderId='.$orderId.')';
            return $resp;
        }
        if ($successLength != ($lostLength + $winLength)) {//确认出票成功的都已经开奖
            $this->common->logger->info('成功的票和开奖的票数量不符(orderId='.$orderId.')');
            $resp->msg = '成功的票和开奖的票数量不符(orderId='.$orderId.')';
            return $resp;
        }
        if ($ticketCountPrizeAmount <= 0) {
            $this->common->logger->info('未获取票中奖金额(orderId='.$orderId.')');
            $resp->msg = '未获取票中奖金额(orderId='.$orderId.')';
            return $resp;
        }
        $database = requireModule("Database");
        $field = array();
        $field[] = 'ticketPrizeAmount="' . $database->escape($ticketCountPrizeAmount) . '"';
        $sql = 'update t_order set ' . implode(',', $field) . ' where orderId="' . $orderId . '" and orderType=7 and status="'.$database->escape($status).'" and ticketPrizeAmount=0 and ticketStatus="'.$database->escape($ticketStatus).'" limit 1';
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = "sql执行失败";
            return $resp;
        }
        $database->close();
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

    private function sendMsg($msg) {
        if (!is_array($msg) || count($msg) <= 0) {
            return;
        }
        $orderId = (int)$msg['orderId'];
        $title = trim($msg['title']);
        $content = trim($msg['content']);
        if ($orderId <= 0 || empty($title) || empty($content)) {
            return;
        }
        //模版消息
        $jssdk = requireModule('Jssdk');
        $msgParam = array(
            'title' => $title
        );
        global $curEnv;
        if ($curEnv == 'dist') {
            $msgParam['userId'] = array(2,2142);//2=痞子逛大街, 2142=LuanQ~~
        } else if ($curEnv == 'beta') {
            $msgParam['userId'] = array(1410,1411);//1410=痞子逛大街, 1411=LuanQ~~
        }
        $msgParam['content'] = $content;
        $jssdk->pushMessage($msgParam);
    }

    public function digitalPlanPrizeStatus() {
        $param = array();
        $param['playType'] = 2;//1=竞技彩方案, 2=数字彩方案
        $param['orderType'] = 0;//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=出票订单
        $param['status'] = 2; //订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        $param['planPrizeStatus'] = 0;//方案中奖状态, 0=未开奖, 1=已中奖, 2=未中奖
        $param['pageNum'] = 1;
        $param['pageSize'] = 1000;
        $selectOrderResp = $this->orderService->selectOrder($param);
        if ($selectOrderResp->errCode != 0) {
            $this->common->logger->info('订单查询异常');
            return;
        }
        $orderList = $selectOrderResp->data['list'];
        $this->common->logger->info(count($orderList).'个数字彩方案订单参与算奖');
        $orderList= $this->commonService->setLotteryIssue($orderList);
        for ($i = 0, $length = count($orderList); $i < $length; $i++) {
            $order = $orderList[$i];
            $planType = (int)$order['planType'];
            $orderId = (int)$order['orderId'];
            $orderType = (int)$order['orderType'];
            $status = (int)$order['status'];//订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
            $lotteryId = trim($order['lotteryId']);
            $issue = trim($order['issue']);
            $betContent = trim($order['betContent']);
            $lotteryIssue = $order['lotteryIssue'];
            if (empty($order) || $planType != 2 || $orderId <= 0 ||  $orderType != 0 || $status != 2 || empty($lotteryId) || empty($issue) || empty($betContent) || empty($lotteryIssue)) {
                continue;
            }
            $doDigitalPlanPrizeStatusResp = $this->doDigitalPlanPrizeStatus($orderId);
            if ($doDigitalPlanPrizeStatusResp->errCode != 0) {
                $this->common->logger->info('数字彩方案订单算奖失败('.$orderId.')：'.$doDigitalPlanPrizeStatusResp->msg);
            } else {
                $this->common->logger->info('数字彩方案订单算奖成功('.$orderId.')');
            }
        }
        $this->common->logger->info('数字彩方案订单算奖完成('.count($orderList).')');
    }

    public function doDigitalPlanPrizeStatus($orderId) {
        $resp = requireModule('Resp');
        $orderId = (int)$orderId;
        if ($orderId <= 0) {
            $resp->msg = "orderId参数有误";
            return $resp;
        }
        $selectOrderByIdResp = $this->orderService->selectOrderById($orderId);
        if ($selectOrderByIdResp->errCode != 0) {
            $resp->msg = "查询订单异常";
            return $resp;
        }
        $order = $selectOrderByIdResp->data;
        if (empty($order)) {
            $resp->msg = "订单数据异常";
            return $resp;
        }
        $order = $this->commonService->setLotteryIssue(array($order))[0];
        $planType = (int)$order['planType'];
        $orderId = (int)$order['orderId'];
        $orderType = (int)$order['orderType'];
        $status = (int)$order['status'];//订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        $planPrizeStatus = (int)$order['planPrizeStatus'];//方案中奖状态, 0=未开奖, 1=已中奖, 2=未中奖
        $lotteryId = trim($order['lotteryId']);
        $issue = trim($order['issue']);
        $betContent = trim($order['betContent']);
        $lotteryIssue = $order['lotteryIssue'];
        if ($planType != 2) {
            $resp->msg = "方案类型异常";
            return $resp;
        }
        if ($orderId <= 0) {
            $resp->msg = "订单id异常";
            return $resp;
        }
        if ($orderType != 0) {
            $resp->msg = "订单类型异常";
            return $resp;
        }
        if ($status != 2) {
            $resp->msg = "订单状态异常";
            return $resp;
        }
        if ($planPrizeStatus != 0) {
            $resp->msg = "方案中奖状态异常";
            return $resp;
        }
        if (empty($lotteryId)) {
            $resp->msg = "彩种id异常";
            return $resp;
        }
        if (empty($issue)) {
            $resp->msg = "期号异常";
            return $resp;
        }
        if (empty($betContent)) {
            $resp->msg = "投注内容异常";
            return $resp;
        }
        if (empty($lotteryIssue)) {
            $resp->msg = "期号信息异常";
            return $resp;
        }
        $calculatePrizeResp = $this->commonService->calculateDigitalPrize($lotteryId, $betContent, $lotteryIssue);
        if ($calculatePrizeResp->errCode != 0 || empty($calculatePrizeResp->data)) {
            $this->common->logger->info($calculatePrizeResp->msg.'(orderId='.$orderId.')');
            $resp->msg = $calculatePrizeResp->msg.'(orderId='.$orderId.')';
            return $resp;
        }
        $prizeList = $calculatePrizeResp->data;
        $prizeStatus = 0;//中奖状态, 0=未开奖, 1=已中奖, 2=未中奖
        foreach ($prizeList as $prize) {
            $pStatus = (int)$prize['prizeStatus'];
            if ($pStatus == 1) {
                $prizeStatus = 1;
            } else if ($pStatus == 2 && $prizeStatus == 0) {
                $prizeStatus = 2;
            }
        }
        if ($prizeStatus != 0) {
            $database = requireModule("Database");
            $field = array();
            $field[] = 'planPrizeStatus="' . $database->escape($prizeStatus) . '"';
            $sql = 'update t_order set ' . implode(',', $field) . ' where orderId="' . $orderId . '" and orderType=0 and status=2 and planType=2 and planPrizeStatus=0 limit 1';
            $result = $database->execute($sql);
            if (!$result) {
                $database->close();
                $resp->msg = "sql执行失败";
                return $resp;
            }
            $database->close();
        }
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

    /********************************************************************* 冠亚军和数字彩分割线  **************************************************************************/
    //冠亚军订单状态变化
    public function guessTicketStatus() {
        $param = array();
        $param['orderType'] = 9;//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=出票订单, 9=冠亚军竞猜订单
        $param['status'] = array(2,4); //订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        $param['ticketStatus'] = array(0,2,7,8);//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
        $param['pageNum'] = 1;
        $param['pageSize'] = 1000;
        $selectOrderResp = $this->orderService->selectOrder($param);
        if ($selectOrderResp->errCode != 0) {
            $this->common->logger->info('订单查询异常');
            return;
        }
        $orderList = $selectOrderResp->data['list'];
        $this->common->logger->info(count($orderList).'个出票订单参与算奖');
        $orderList = $this->commonService->setGuessList($orderList);
        for ($i = 0, $length = count($orderList); $i < $length; $i++) {
            $order = $orderList[$i];
            $orderId = (int)$order['orderId'];
            $orderType = (int)$order['orderType'];
            $status = (int)$order['status'];//订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
            $amount = (int)$order['amount'];
            $ticketStatus = (int)$order['ticketStatus'];//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
            $ticketUnit = (int)$order['ticketUnit'];
            $ticketMultiple = (int)$order['ticketMultiple'];
            $planMatchRecommend = trim($order['planMatchRecommend']);
            $guessList = $order['guessList'];
            if (empty($order) || $orderId <= 0 || $orderType != 9 || ($status != 2 && $status != 4) || $amount <= 0 || ($ticketStatus != 0 && $ticketStatus != 2 && $ticketStatus != 7 && $ticketStatus != 8) || $ticketUnit <= 0 || $ticketMultiple <= 0 || empty($planMatchRecommend) || count($guessList) <= 0 || $ticketUnit != count($guessList)) {
                continue;
            }
            $doGuessTicketStatusResp = $this->doGuessTicketStatus($orderId);
            if ($doGuessTicketStatusResp->errCode != 0) {
                $this->common->logger->info('冠亚军订单算奖失败('.$orderId.')：'.$doGuessTicketStatusResp->msg);
            } else {
                $this->common->logger->info('冠亚军订单算奖成功('.$orderId.')');
            }
        }
        $this->common->logger->info('冠亚军订单算奖完成('.count($orderList).')');
    }

    public function doGuessTicketStatus($orderId) {
        $resp = requireModule('Resp');
        $orderId = (int)$orderId;
        if ($orderId <= 0) {
            $resp->msg = "orderId参数有误";
            return $resp;
        }
        $selectOrderByIdResp = $this->orderService->selectOrderById($orderId);
        if ($selectOrderByIdResp->errCode != 0) {
            $resp->msg = "查询订单异常";
            return $resp;
        }
        $order = $selectOrderByIdResp->data;
        if (empty($order)) {
            $resp->msg = "订单数据异常";
            return $resp;
        }
        $order = $this->commonService->setGuessList(array($order))[0];
        $orderId = (int)$order['orderId'];
        $orderType = (int)$order['orderType'];
        $status = (int)$order['status'];//订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
        $amount = (int)$order['amount'];
        $ticketStatus = (int)$order['ticketStatus'];//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
        $ticketUnit = (int)$order['ticketUnit'];
        $ticketMultiple = (int)$order['ticketMultiple'];
        $ticketSupplierId = (int)$order['ticketSupplierId'];
        $planMatchRecommend = trim($order['planMatchRecommend']);
        $lotteryId = trim($order['lotteryId']);
        $guessList = $order['guessList'];
        if ($orderId <= 0) {
            $resp->msg = "订单id异常";
            return $resp;
        }
        if ($orderType != 9) {
            $resp->msg = "订单类型异常";
            return $resp;
        }
        if ($status != 2 && $status != 4) {
            $resp->msg = "订单状态异常";
            return $resp;
        }
        if ($amount <= 0) {
            $resp->msg = "订单金额异常";
            return $resp;
        }
        if ($ticketStatus != 0 && $ticketStatus != 2 && $ticketStatus != 7 && $ticketStatus != 8) {
            $resp->msg = "出票状态异常";
            return $resp;
        }
        if ($ticketUnit <= 0) {
            $resp->msg = "注数异常";
            return $resp;
        }
        if ($ticketMultiple <= 0) {
            $resp->msg = "倍数异常";
            return $resp;
        }
        if (empty($lotteryId)) {
            $resp->msg = "彩种异常";
            return $resp;
        }
        if ($ticketUnit != count($guessList)) {
            $resp->msg = "注数异常";
            return $resp;
        }
        if (empty($planMatchRecommend) || empty($guessList) || count($guessList) <= 0) {
            $resp->msg = "比赛推荐异常";
            return $resp;
        }
        $ticketList = array();
        if ($ticketSupplierId > 0) {
            $param = array();
            $param['orderId'] = $orderId;
            $param['needSport'] = true; //出票时，冠亚军的过关方式填了1×1
            $selectTicketResp = $this->ticketService->selectTicket($param);
            if ($selectTicketResp->errCode != 0) {
                $this->common->logger->info('票查询异常');
                $resp->msg = "票查询异常";
                return $resp;
            }
            $ticketList = $selectTicketResp->data['list'];
        }
        //在什么时候是截至买票的,需要改变
        $SJBGYJPlanMatchBeginTime = strtotime('2018-07-11 02:00:00');//世界杯冠亚军(第一场半决赛时间)
        $SJBGJPlanMatchBeginTime = strtotime('2018-07-15 23:00:00');//世界杯冠军(决赛时间)
        $offsetTime = 5 * 60;//提前5分钟截止
        $SJBGYJPlanMatchBeginTime -= $offsetTime;
        $SJBGJPlanMatchBeginTime -= $offsetTime;
        $curTime = time();
        $ticketLength = count($ticketList);
        $errorLength = 0;
        $successLength = 0;
        $successMultiple = 0;//出票成功倍数
        if ($ticketSupplierId > 0) {
            if (is_array($ticketList) && $ticketLength > 0) {
                $ticketCountAmount = 0;
                foreach ($ticketList as $ticket) {
                    $tId = (int)$ticket['ticketId'];
                    $ts = (int)$ticket['status'];//出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已撤单
                    $ta = (int)$ticket['amount'];
                    $tm = (int)$ticket['multiple'];
                    $tb = trim($ticket['betContent']);
                    if ($tId <= 0 || $ta <= 0 || $tm <= 0 || empty($tb)) {
                        $this->common->logger->info('票内容异常(ticketId='.$tId.')');
                        $resp->msg = '票内容异常(ticketId='.$tId.')';
                        return $resp;
                    }
                    $ticketCountAmount += $ta;
                    if ($ts == 1 || $ts == 5) {
                        $errorLength++;
                    } else if ($ts == 2 || $ts == 3 || $ts == 4) {
                        $successLength++;
                        $successMultiple += $tm;
                    }
                }
                if ($ticketCountAmount != $amount) {
                    $this->common->logger->info('订单和票信息不符(orderId='.$orderId.')');
                    $resp->msg = '订单和票信息不符(orderId='.$orderId.')';
                    return $resp;
                }
            }
        } else {
            $successMultiple = $ticketMultiple;
        }
        $tStatus = null;//等待设置的票状态
        $ticketExpectPrizeAmount = 0;
        if ($ticketStatus == 0) {   //未出票
            if ($lotteryId == 'SJBGYJ') {
                if ($curTime >= $SJBGYJPlanMatchBeginTime) {
                    $tStatus = 1;
                }
            } else if ($lotteryId == 'SJBGJ') {
                if ($curTime >= $SJBGJPlanMatchBeginTime) {
                    $tStatus = 1;
                }
            }
        } else if ($ticketStatus == 7) {
            if ($ticketSupplierId > 0 && $ticketLength > 0) {
                if ($ticketLength == $errorLength) {
                    $tStatus = 1;
                } else if ($ticketLength == $successLength) {
                    $tStatus = 2;
                } else if ($ticketLength == ($successLength + $errorLength)) {
                    $tStatus = 8;
                }
            }
        } else if ($ticketStatus == 2 || $ticketStatus == 8) {  //2=已出票待开奖  8=部分出票
            //判断投注内容是否中奖  设置预计中奖金额
            $calculateGuessPrizeResp = $this->commonService->calculateGuessPrize($guessList);//返回是否中奖，理论中奖金额
            if ($calculateGuessPrizeResp->errCode != 0) {
                $this->common->logger->info($calculateGuessPrizeResp->msg);
                $resp->msg = $calculateGuessPrizeResp->msg;
                return $resp;
            }
            $prizeMap = $calculateGuessPrizeResp->data;
            $prizeStatus = (int)$prizeMap['prizeStatus'];   //是否中奖 0=未开奖 1=已中奖 2=未中奖
            $prizeOddsId = (int)$prizeMap['prizeOddsId'];
            $prizeOdds = trim($prizeMap['prizeOdds']);  //中奖的赔率
            $sp = $this->common->roundSp($prizeOdds * 2, 2);//把sp,四舍六入五成双
            if ($prizeStatus == 1) {
                $ticketExpectPrizeAmount = $sp * $successMultiple * 100;
            }
            if ($prizeStatus == 1 || $prizeStatus == 2) {
                //固化中奖状态
                $planMatchRecommend = json_decode($planMatchRecommend);
                foreach ($planMatchRecommend as &$mr) {
                    $oddsId = (int)$mr->oddsId;
                    if ($oddsId > 0) {
                        $mr->isPrize = $oddsId == $prizeOddsId;
                    }
                }
                $planMatchRecommend = json_encode($planMatchRecommend);
            }
            if ($ticketStatus == 2) {
                if ($ticketSupplierId > 0) {
                    if ($ticketLength > 0 && $ticketLength == $successLength) {
                        if ($prizeStatus == 1) {
                            $tStatus = 4;
                        } else if ($prizeStatus == 2) {
                            $tStatus = 3;
                        }
                    }
                } else {
                    if ($prizeStatus == 1) {
                        $tStatus = 4;
                    } else if ($prizeStatus == 2) {
                        $tStatus = 3;
                    }
                }
            } else if ($ticketStatus == 8) {
                if ($ticketSupplierId > 0 && $status == 4 && $ticketLength > 0 && $ticketLength > $successLength) {
                    //"部分出票"的订单，需要等订单"部分退款"后才能算奖
                    //确认出票成功的都已经开奖
                    if ($prizeStatus == 1) {
                        $tStatus = 4;
                    } else if ($prizeStatus == 2) {
                        $tStatus = 3;
                    }
                }
            }
        }
        if ($tStatus === null) {
            $resp->msg = "不符合状态设置";
            return $resp;
        }
        $database = requireModule("Database");
        $sqlArr = array();
        $field = array();
        $field[] = 'ticketStatus="' . $database->escape($tStatus) . '"';
        if (($ticketStatus == 2 || $ticketStatus == 8) && $tStatus == 4) {
            $field[] = 'ticketExpectPrizeAmount="' . $database->escape($ticketExpectPrizeAmount) . '"';
        }
        $field[] = 'planMatchRecommend="' . $database->escape($planMatchRecommend) . '"';
        $sqlArr[] = 'update t_order set ' . implode(',', $field) . ' where orderId="' . $orderId . '" and orderType=9 and status="'.$database->escape($status).'" and ticketStatus="'.$database->escape($ticketStatus).'" limit 1';
        //更新出票表(matchRecommend)比赛开奖信息
        //出票状态, 0=未出票, 1=出票失败, 2=已出票待开奖, 3=未中奖, 4=已中奖, 5=已派奖, 6=部分派奖, 7=出票中, 8=部分出票
        $planMatchRecommend = json_decode($planMatchRecommend);
        if ($ticketSupplierId > 0 && ($tStatus == 3 || $tStatus == 4) && !empty($planMatchRecommend) && is_array($ticketList) && $ticketLength > 0) {
            $matchRecommendMap = array();
            foreach ($planMatchRecommend as $mr) {
                $oddsId = (int)$mr->oddsId;
                if ($oddsId > 0) {
                    $matchRecommendMap[$oddsId] = $mr;;
                }
            }
            foreach ($ticketList as $ticket) {
                $tId = (int)$ticket['ticketId'];
                $matchRecommend = json_decode(trim($ticket['matchRecommend']));
                if ($tId <= 0 || empty($matchRecommend)) {
                    continue;
                }
                foreach ($matchRecommend as &$mr) {
                    $oddsId = (int)$mr->oddsId;
                    $item = $matchRecommendMap[$oddsId];
                    if ($oddsId <= 0 || empty($item)) {
                        continue;
                    }
                    $mr->isPrize = $item->isPrize;
                }
                $matchRecommend = json_encode($matchRecommend);
                if (!empty($matchRecommend)) {
                    $sqlArr[] = 'update t_ticket set matchRecommend="' . $database->escape($matchRecommend) .'" where ticketId="' . $tId . '" limit 1';
                }
            }
        }
        if (count($sqlArr) > 0) {
            $sql = implode(';', $sqlArr);
            $result = $database->multiExecute($sql);
            $database->multiFree();
            if (!$result) {
                $database->close();
                $resp->msg = "sql执行失败";
                return $resp;
            }
        }
        $database->close();
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }
}