<?php
namespace service;
class Common extends Base {
	private $common;
	private $userService;
	private $adminUserService;
	private $matchService;
	private $financeService;
	private $orderService;
	private $planService;
	private $resourceService;
	private $focusService;
    private $groupService;
	private $comboService;
	private $lotteryService;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->userService = requireService("User");
		$this->adminUserService = requireService("AdminUser");
		$this->matchService = requireService("Match");
		$this->financeService = requireService("Finance");
		$this->orderService = requireService("Order");
		$this->planService = requireService("Plan");
		$this->resourceService = requireService("Resource");
		$this->focusService = requireService("Focus");
		$this->groupService = requireService("Group");
		$this->comboService = requireService("Combo");
		$this->lotteryService = requireService("Lottery");
	}
	
	public function saveWeixinFile($serverId) {
		global $staticPath;
		$resp = requireModule("Resp");
		$jssdk = requireModule("Jssdk");
		$accessToken = trim($jssdk->getAccessToken());
		if (!empty($accessToken)) {
			$url = 'http://file.api.weixin.qq.com/cgi-bin/media/get?access_token='.$accessToken.'&media_id='.$serverId;
			$result = file_get_contents($url);
			if ($result) {
				//资源表插入
				$param = array();
				$param['type'] = 1;
				$param['fileName'] = '';
				$param['extension'] = '';
				$insertResourceResp = $this->resourceService->insertResource($param);
				if ($insertResourceResp->errCode != 0) {
					$resp->msg = "添加资源失败";
					return $resp;
				}
				$resourceId = (int)$insertResourceResp->data;
				if ($resourceId <= 0) {
					$resp->msg = "添加资源失败";
					return $resp;
				}
				$destDir = $staticPath.'image/';
				$destPath = $destDir.$resourceId;
				if (!is_dir($destDir)) {
					mkdir($destDir, 0700, true);
				}
				$result = file_put_contents($destPath, $result);
				if ($result) {
					$resp->data = $resourceId;
					$resp->errCode = 0;
					$resp->msg = '成功';
					return $resp;
				}
			}
		}
		$resp->msg = '图片保存失败';
		return $resp;
	}

	public function saveUploadFile($srcPath, $fileName, $extension) {
		global $staticPath;
		$resp = requireModule("Resp");
		$srcPath = trim($srcPath);
		if (empty($srcPath)) {
			$resp->msg = 'srcPath参数有误';
			return $resp;
		}
		//资源表插入
		$param = array();
		$param['type'] = 1;
		$param['fileName'] = $fileName;
		$param['extension'] = $extension;
		$insertResourceResp = $this->resourceService->insertResource($param);
		if ($insertResourceResp->errCode != 0) {
			$resp->msg = "添加资源失败";
			return $resp;
		}
		$resourceId = (int)$insertResourceResp->data;
		if ($resourceId <= 0) {
			$resp->msg = "添加资源失败";
			return $resp;
		}
		$maxWidth = 720;
		$maxHeight = 1280;
		$imgQuality = 100;
		list($width, $height, $type) = getimagesize($srcPath);
		switch ($type) {
			case 1: $img = imagecreatefromgif($srcPath); break;
			case 2: $img = imagecreatefromjpeg($srcPath); break;
			case 3: $img = imagecreatefrompng($srcPath); break;
		}
		if (empty($img)) {
			$resp->msg = "错误的图片类型";
			return $resp;
		}
		$destDir = $staticPath.'image/';
		$destPath = $destDir.$resourceId.(empty($extension) ? '' : '.'.$extension);
		if (!is_dir($destDir)) {
			mkdir($destDir, 0700, true);
		}
		//便于释放图片内存
		$srcImg = $img;
		if($width > $maxWidth  || $height > $maxHeight) {
			$scaleWidth = $maxWidth/$width;
			$scaleHeight = $maxHeight/$height;
			if ($width > $maxWidth && $height > $maxHeight) {
				$scale = min($scaleWidth, $scaleHeight);
				$newWidth = floor($scale*$width);
				$newHeight = floor($scale*$height);
			} else if ($width > $maxWidth) {
				$newWidth = floor($scaleWidth*$width);
				$newHeight = floor($scaleWidth*$height);
			} else if ($height > $maxHeight) {
				$newWidth = floor($scaleHeight*$width);
				$newHeight = floor($scaleHeight*$height);
			}
			$img = imagecreatetruecolor($newWidth, $newHeight);
			imagecopyresampled($img, $srcImg, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
		}
		switch($type) {
			case 1: imagegif($img, $destPath); break;
			case 2: imagejpeg($img, $destPath, $imgQuality); break;
			case 3: imagepng($img, $destPath); break;
		}
		//代表经历过压缩
		if ($srcImg != $img) {
			imagedestroy($srcImg);
		}
		imagedestroy($img);
		$resp->data = $resourceId;
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	//给每个对象设置matchList
	public function setMatchList($objectList, $key = 'matchRecommend') {
		if (!is_array($objectList) || count($objectList) <= 0) {
			return $objectList;
		}
		$matchIdArr = array();
		$matchOddsIdArr = array();
		foreach ($objectList as $object) {
			$matchRecommend = json_decode($object[$key], true);
			if (!empty($matchRecommend) && is_array($matchRecommend)) {
				foreach ($matchRecommend as $mr) {
					$matchId = (int)$mr['matchId'];
					if ($matchId > 0) {
						$matchIdArr[] = $matchId;
					}
					$oddsId = (int)$mr['oddsId'];
					if ($oddsId > 0) {
						$matchOddsIdArr[] = $oddsId;
					}
				}
			}
		}
		//得到比赛
		$matchMap = array();
		if (count($matchIdArr) > 0) {
			$param = array();
			$param['matchId'] = $matchIdArr;
			$selectMatchResp = $this->matchService->selectMatch($param);
			if ($selectMatchResp->errCode == 0) {
				$list = $selectMatchResp->data['list'];
				if (!empty($list)) {
					foreach ($list as $l) {
						$matchId = (int)$l['matchId'];
						if ($matchId > 0) {
							$matchMap[$matchId] = $l;
						}
					}
				}
			}
		}
		//得到比赛赔率
		$matchOddsMap = array();
		if (count($matchOddsIdArr) > 0) {
			$param = array();
			$param['oddsId'] = $matchOddsIdArr;
			$selectMatchOddsResp = $this->matchService->selectMatchOdds($param);
			if ($selectMatchOddsResp->errCode == 0) {
				$list = $selectMatchOddsResp->data['list'];
				if (!empty($list)) {
					foreach ($list as $l) {
						$oddsId = (int)$l['oddsId'];
						if ($oddsId > 0) {
							$matchOddsMap[$oddsId] = $l;
						}
					}
				}
			}
		}
		for ($j = 0, $len = count($objectList); $j < $len; $j++) {
			$matchRecommend = json_decode($objectList[$j][$key], true);
			if (!empty($matchRecommend) && is_array($matchRecommend)) {
                $matchBettypeNameArr = array();
				for ($i = 0, $length = count($matchRecommend); $i < $length; $i++) {
					$matchId = (int)$matchRecommend[$i]['matchId'];
					$oddsId = (int)$matchRecommend[$i]['oddsId'];
					//为app(ios,android做兼容), 因为不存在属性，它们会崩溃
					$recommend = $matchRecommend[$i]['recommend'];
					$prize = $matchRecommend[$i]['prize'];
					$bettypeResult = $matchRecommend[$i]['bettypeResult'];
					$bettypePrize = $matchRecommend[$i]['bettypePrize'];
					if (empty($bettypeResult)) {
						$bettypeResult = new \stdClass();
					}
					$recommend = $this->toStringArray($recommend);
					$prize = $this->toStringArray($prize);
					$bettypePrize = $this->toStringArray($bettypePrize);
					$matchRecommend[$i]['recommend'] = $recommend;
					$matchRecommend[$i]['prize'] = $prize;
					$matchRecommend[$i]['bettypeResult'] = $bettypeResult;
					$matchRecommend[$i]['bettypePrize'] = $bettypePrize;
					if (!empty($matchMap[$matchId])) {
						$matchRecommend[$i]['commonMatchId'] = trim($matchMap[$matchId]['commonMatchId']);
						$matchRecommend[$i]['number'] = trim($matchMap[$matchId]['number']);
						$matchRecommend[$i]['league'] = trim($matchMap[$matchId]['league']);
                        /*if ($matchRecommend[$i]['league'] == "美职篮") {
                            $matchRecommend[$i]['league'] = "NBA";
                        }*/
						$matchRecommend[$i]['home'] = trim($matchMap[$matchId]['home']);
						$matchRecommend[$i]['away'] = trim($matchMap[$matchId]['away']);
						$matchRecommend[$i]['beginTime'] = trim($matchMap[$matchId]['beginTime']);
						$matchRecommend[$i]['endTime'] = trim($matchMap[$matchId]['endTime']);
						$matchRecommend[$i]['halfResult'] = trim($matchMap[$matchId]['halfResult']);
						$matchRecommend[$i]['result'] = trim($matchMap[$matchId]['result']);
						$matchRecommend[$i]['type'] = (int)$matchMap[$matchId]['type'];
						$matchRecommend[$i]['attachPrize'] = (int)$matchMap[$matchId]['attachPrize'];
					}
					if (!empty($matchOddsMap[$oddsId])) {
						$bettypeValue = trim($matchOddsMap[$oddsId]['bettypeValue']);
						$bettypeOdds = trim($matchOddsMap[$oddsId]['bettypeOdds']);
						$concede = trim($matchOddsMap[$oddsId]['concede']);
						if (!empty($bettypeValue)) {
							$bettypeValue = json_decode($bettypeValue);
						}
						if (!empty($bettypeOdds)) {
							$bettypeOdds = json_decode($bettypeOdds);
						}
						if (!empty($matchRecommend[$i]['bettypeOdds'])) {
							//$bettypeOdds = (object)$matchRecommend[$i]['bettypeOdds'];这样是错误的
							//会存在整形的属性，类将读取不到
							//所以这里要这样转成对象，否则"总进球玩法"在这里将由于整形属性，对象读取不到值
							$bettypeOdds = new \stdClass();
							foreach ($matchRecommend[$i]['bettypeOdds'] as $k => $v) {
								$bettypeOdds->$k = $v;
							}
						}
						if (!empty($matchRecommend[$i]['concede'])) {
							$concede = $matchRecommend[$i]['concede'];
						}
                        $matchBettypeNameArr[] = trim($matchOddsMap[$oddsId]['bettypeName']);
						$matchRecommend[$i]['single'] = trim($matchOddsMap[$oddsId]['single']);
						$matchRecommend[$i]['concede'] = trim($concede);
						$matchRecommend[$i]['bettypeName'] = trim($matchOddsMap[$oddsId]['bettypeName']);
						$matchRecommend[$i]['bettypeContent'] = trim($matchOddsMap[$oddsId]['bettypeContent']);
						$matchRecommend[$i]['bettypeValue'] = $bettypeValue;
                        $matchRecommend[$i]['bettypeOdds'] = $bettypeOdds;
					}
				}
				$objectList[$j]['matchList'] = $matchRecommend;
                $matchBettypeNameArr = array_unique($matchBettypeNameArr);
                if (count($matchBettypeNameArr) > 1) {
                    $matchBettypeName = "混合过关";
                } else if (count($matchBettypeNameArr) == 1) {
                    $matchBettypeName = $matchBettypeNameArr[0];
                }
				$objectList[$j]['matchBettypeName'] = $matchBettypeName;
			}
		}
		return $objectList;
	}

	public function setYaPanMatchList($matchList) {
		if (!is_array($matchList) || count($matchList) <= 0) {
			return $matchList;
		}
		$matchListMap = array();
		$matchIdArr = array();
		foreach ($matchList as $match) {
			$matchId = (int)$match['matchId'];
			if ($matchId > 0) {
				$matchIdArr[] = $matchId;
				$matchListMap[$matchId] = $match;
			}
		}
		$param = array();
		$param['matchId'] = $matchIdArr;
		$selectMatchOddsResp = $this->matchService->selectMatchOdds($param);
		if ($selectMatchOddsResp->errCode != 0) {
			return $matchList;
		}
		$matchOddsList = $selectMatchOddsResp->data['list'];
		$bettypeContentMap = array();
		for ($i = 0, $length = count($matchOddsList); $i < $length; $i++) {
			$matchId = (int)$matchOddsList[$i]['matchId'];
			$oddsId = (int)$matchOddsList[$i]['oddsId'];
			$bettypeContent = trim($matchOddsList[$i]['bettypeContent']);
			$bettypeOdds = trim($matchOddsList[$i]['bettypeOdds']);
			$concede = trim($matchOddsList[$i]['concede']);
			if ($matchId <= 0 || $oddsId <= 0 || empty($bettypeContent) || empty($bettypeOdds)) {
				continue;
			}
			if ($bettypeContent == 'SPF' || ($bettypeContent == 'RQSPF' && abs($concede) == 1)) {
				if (empty($bettypeContentMap[$matchId])) {
					$bettypeContentMap[$matchId] = array();
				}
				if (empty($bettypeContentMap[$matchId][$bettypeContent])) {
					$bettypeContentMap[$matchId][$bettypeContent] = array();
				}
				if (!empty($bettypeOdds)) {
					$bettypeOdds = json_decode($bettypeOdds);
				}
				$bettypeContentMap[$matchId][$bettypeContent]['oddsId'] = $oddsId;
				$bettypeContentMap[$matchId][$bettypeContent]['bettypeContent'] = $bettypeContent;
				$bettypeContentMap[$matchId][$bettypeContent]['concede'] = $concede;
				$bettypeContentMap[$matchId][$bettypeContent]['bettypeOdds'] = $bettypeOdds;
			}
		}
		$yaPanMatchIdArr = array();
		foreach ($bettypeContentMap as $mId => $btMap) {
			if (count($btMap) == 2) {
				$yaPanMatchIdArr[] = $mId;
			}
		}
		$yaPanMatchList = array();
		foreach ($matchList as $match) {
			$matchId = (int)$match['matchId'];
			if ($matchId > 0 && in_array($matchId, $yaPanMatchIdArr) && !empty($bettypeContentMap[$matchId])) {
				$SPF = $bettypeContentMap[$matchId]['SPF'];
				$RQSPF = $bettypeContentMap[$matchId]['RQSPF'];
				$spfOddsId = (int)$SPF['oddsId'];
				$rqspfOddsId = (int)$RQSPF['oddsId'];
				$concede = trim($RQSPF['concede']);
				$spfBettypeOdds = $SPF['bettypeOdds'];
				$rqspfBettypeOdds = $RQSPF['bettypeOdds'];
				$matchOb = $matchListMap[$matchId];
				if ($spfOddsId <= 0 || $rqspfOddsId <= 0 || abs($concede) != 1 || empty($spfBettypeOdds) || empty($rqspfBettypeOdds) || empty($matchOb) || !is_array($matchOb['recommend']) || count($matchOb['recommend']) != 1 || empty(trim($matchOb['recommend'][0]))) {
					continue;
				}
				$prize = array();
				$bettypeResult = new \stdClass();
				$bettypePrize = array();
				$matchObRecommendItem = trim($matchOb['recommend'][0]);//推荐的选项
				$matchObBettypeOdds = $matchOb['bettypeOdds'];
				$matchObBettypeResult = $matchOb['bettypeResult'];
				$matchObBettypeResultArr = array();
				foreach ($matchObBettypeResult as $item => $value) {
					if ($value === true) {
						$matchObBettypeResultArr[] = $item;
					}
				}
				if (count($matchObBettypeResultArr) == 1) {
					$matchObBettypeResultArrItem = trim($matchObBettypeResultArr[0]);
					if ($matchObRecommendItem == $matchObBettypeResultArrItem) {
						$prize[] = $matchObRecommendItem;
						$bettypePrize[] = $matchObRecommendItem;
						$bettypeResult->S = false;
						$bettypeResult->F = false;
						$bettypeResult->$matchObRecommendItem = true;
					} else if ($matchObRecommendItem == 'S') {
						$bettypeResult->S = false;
						$bettypeResult->F = true;
						$bettypePrize[] = 'F';
					} else if ($matchObRecommendItem == 'F') {
						$bettypeResult->S = true;
						$bettypeResult->F = false;
						$bettypePrize[] = 'S';
					}
				}
				$bettypeOdds = new \stdClass();
				$recommendBettype = new \stdClass();//最新的赔率
				if ($concede == 1) {
					$concede = "0.5";
					$bettypeOdds->S = $rqspfBettypeOdds->S;
					$bettypeOdds->F = $spfBettypeOdds->F;
					$recommendBettype->S = $RQSPF;
					$recommendBettype->F = $SPF;
				} else if ($concede == -1) {
					$concede = "-0.5";
					$bettypeOdds->S = $spfBettypeOdds->S;
					$bettypeOdds->F = $rqspfBettypeOdds->F;
					$recommendBettype->S = $SPF;
					$recommendBettype->F = $RQSPF;
				}
				$match['single'] = 0;
				$match['concede'] = $concede;
				$match['bettypeName'] = '胜负';
				$match['bettypeContent'] = 'SF';
				$match['bettypeValue'] = array(
					'S' => '胜',
					'F' => '负'
				);
				$match['bettypeOdds'] = $bettypeOdds;
				$match['prize'] = $prize;
				$match['bettypeResult'] = $bettypeResult;
				$match['bettypePrize'] = $bettypePrize;
				$match['recommendBettype'] = $recommendBettype;
				$match['fixBettypeOdds'] = $matchObBettypeOdds;//固化的赔率
				$yaPanMatchList[] = $match;
			}
		}
		return $yaPanMatchList;
	}

    public function setMatchLive($objectList, $key = 'live') {
        if (!is_array($objectList) || count($objectList) <= 0) {
            return $objectList;
        }
        for ($j = 0, $len = count($objectList); $j < $len; $j++) {
            $live = trim($objectList[$j][$key]);
            $liveJson = json_decode($live, true);
            if (empty($live) || empty($liveJson)) {
                continue;
            }
            $animation = $liveJson['animation'];
            $video = $liveJson['video'];
            $animationUrl = '';
            $videoUrl = '';
            if (is_array($animation) && count($animation) > 0) {
                $animationUrl = trim($animation[0]['url']);
            }
            if (is_array($video) && count($video) > 0) {
                $videoUrl = trim($video[0]['url']);
            }
            $objectList[$j]['animationUrl'] = $animationUrl;
            $objectList[$j]['videoUrl'] = $videoUrl;
        }
        return $objectList;
    }

    //给每个球队设置联赛信息,考虑到前端，不管有没有数据都set leagueRank
    public function setMatchLeagueInfo($objectList){
        if (!is_array($objectList) || count($objectList) <= 0) {
            return $objectList;
        }
        $teamIdArr = array();
        foreach ($objectList as $object) {
            $homeTeamId = (int)$object['sportteryHomeTeamId'];
            $awayTeamId = (int)$object['sportteryAwayTeamId'];
            if ($homeTeamId > 0) {
                $teamIdArr[] = $homeTeamId;
            }
            if ($awayTeamId > 0) {
                $teamIdArr[] = $awayTeamId;
            }
        }
        $param = array();
        $param['teamId'] = $teamIdArr;
        $selectAdditionalTeamScoreResp = $this->matchService->selectAdditionalTeamScore($param);
        $teamScoreList = $selectAdditionalTeamScoreResp->data['list'];
        $teamScoreMap = array();
        foreach ($teamScoreList as $item) {
            $sportteryLeagueId = (int)$item['sportteryLeagueId'];
            $sportteryGroupId = (int)$item['sportteryGroupId'];
            $sportteryTeamId = (int)$item['sportteryTeamId'];
            $key = $sportteryLeagueId . '-' . $sportteryGroupId . '-' . $sportteryTeamId;
            if ($sportteryLeagueId > 0) {
                $teamScoreMap[$key] = $item;
            }
        }
        for ($i = 0, $length = count($objectList); $i < $length; $i++) {
            $sportteryLeagueInfo = trim($objectList[$i]['sportteryLeagueInfo']);
            $homeTeamId = (int)$objectList[$i]['sportteryHomeTeamId'];
            $awayTeamId = (int)$objectList[$i]['sportteryAwayTeamId'];
            $leagueInfoArr = json_decode($sportteryLeagueInfo, true);
            $leagueId = (int)$leagueInfoArr['leagueId'];
            $groupId = (int)$leagueInfoArr['groupId'];
            $homeKey = $leagueId . '-' . $groupId . '-' . $homeTeamId;
            $awayKey = $leagueId . '-' . $groupId . '-' . $awayTeamId;
            $homeTeamScore = $teamScoreMap[$homeKey];
            $awayTeamScore = $teamScoreMap[$awayKey];
            $teamScoreInfo = array();
            $homeRankTotalResult = $homeTeamScore['totalResult'];
            $homeRankTotalResultArr = json_decode($homeRankTotalResult, true);
            $awayRankTotalResult = $awayTeamScore['totalResult'];
            $awayRankTotalResultArr = json_decode($awayRankTotalResult, true);
            $teamScoreInfo['home']['league'] = trim($homeTeamScore['leagueName']);
            $teamScoreInfo['home']['group'] = trim($homeTeamScore['groupName']);
            $teamScoreInfo['home']['rank'] = trim($homeRankTotalResultArr['rank']);
            $teamScoreInfo['away']['league'] = trim($awayTeamScore['leagueName']);
            $teamScoreInfo['away']['group'] = trim($awayTeamScore['groupName']);
            $teamScoreInfo['away']['rank'] = trim($awayRankTotalResultArr['rank']);
            $objectList[$i]['leagueRank'] = $teamScoreInfo;
        }
        return $objectList;
    }

    //给每个对象设置betContentList
    public function setBetContentList($objectList, $key = 'betContent') {
        if (!is_array($objectList) || count($objectList) <= 0) {
			return $objectList;
        }
        for ($j = 0, $len = count($objectList); $j < $len; $j++) {
            $lotteryId = trim($objectList[$j]['lotteryId']);
            $lotteryIssue = $objectList[$j]['lotteryIssue'];
			$betContent = trim($objectList[$j][$key]);
            if (empty($lotteryId) || empty($lotteryIssue) || empty($betContent)) {
                continue;
            }
            $selectLotteryByIdResp = $this->lotteryService->selectLotteryById($lotteryId);
            if ($selectLotteryByIdResp->errCode != 0) {
				continue;
            }
            $lotteryData = $selectLotteryByIdResp->data;
            $lotteryName = $lotteryData['lotteryName'];
            if (empty($lotteryData) || empty($lotteryName)) {
				continue;
            }
			$calculateDigitalPrizeResp = $this->calculateDigitalPrize($lotteryId, $betContent, $lotteryIssue);
			if ($calculateDigitalPrizeResp->errCode != 0 || empty($calculateDigitalPrizeResp->data)) {
				continue;
			}
			$objectList[$j]['betContentList'] = $calculateDigitalPrizeResp->data;
        }
		return $objectList;
    }

    //给每个对象设置彩种期号
    public function setLotteryIssue($objectList, $param = null) {
        if (!is_array($objectList) || count($objectList) <= 0) {
            return $objectList;
        }
		$lotteryIdKey = 'lotteryId';
		$issueKey = 'issue';
		if (!empty($param)) {
			if (!empty(trim($param['lotteryIdKey']))) {
				$lotteryIdKey = trim($param['lotteryIdKey']);
			}
			if (!empty(trim($param['issueKey']))) {
				$issueKey = trim($param['issueKey']);
			}
		}
		$rowKeyArr = array();
        foreach ($objectList as $object) {
            $lotteryId = trim($object[$lotteryIdKey]);
			$issue = trim($object[$issueKey]);
			if (preg_match('/^[0-9A-Z]+$/', $lotteryId) && preg_match('/^\d+$/', $issue)) {
				$rowKeyArr[] = $lotteryId.$issue;
            }
        }
		$rowKeyArr = array_unique($rowKeyArr);
        //得到其号信息
        $lotteryIssueMap = array();
        if (count($rowKeyArr) > 0) {
            $param = array();
            $param['rowKey'] = $rowKeyArr;
            $selectLotteryIssueResp = $this->lotteryService->selectLotteryIssue($param);
            if ($selectLotteryIssueResp->errCode == 0) {
				$lotteryIssueList = $selectLotteryIssueResp->data['list'];
                if (!empty($lotteryIssueList)) {
                    foreach ($lotteryIssueList as $lotteryIssue) {
                        $lotteryId = trim($lotteryIssue['lotteryId']);
                        $issue = trim($lotteryIssue['issue']);
						if (preg_match('/^[0-9A-Z]+$/', $lotteryId) && preg_match('/^\d+$/', $issue)) {
							$lotteryIssueMap[$lotteryId.$issue] = $lotteryIssue;
                        }
                    }
                }
            }
        }
        for ($i = 0, $len = count($objectList); $i < $len; $i++) {
            $lotteryId = $objectList[$i][$lotteryIdKey];
            $issue = $objectList[$i][$issueKey];
            $rowKey = $lotteryId.$issue;
			if (preg_match('/^[0-9A-Z]+$/', $lotteryId) && preg_match('/^\d+$/', $issue) && key_exists($rowKey, $lotteryIssueMap)) {
				$objectList[$i]['lotteryIssue'] = $lotteryIssueMap[$rowKey];
			}
        }
        return $objectList;
    }

    //给每个对象设置，每个方案设置跟单金额PlanSaleTicketAmount
    public function setPlanSaleTicketAmount($objectList, $key = 'planId') {
        if (!is_array($objectList) || count($objectList) <= 0) {
            return $objectList;
        }
		$planIdArr = array();
		foreach ($objectList as $object) {
			$planId = (int)$object[$key];
			if ($planId > 0) {
				$planIdArr[] = $planId;
			}
		}
		if (count($planIdArr) <= 0) {
			return $objectList;
		}
		$param = array();
		$param['planId'] = $planIdArr;
		$param['orderType'] = array(3,7);//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单, 3=竞彩出票订单, 4=彩金充值订单, 5=晒米冷热订单, 6=极限追盘订单, 7=数字彩出票订单, 8=赠送订单
		$param['status'] = array(2,3,4);//订单状态, 1=未付款, 2=已付款, 3=已退款, 4=部分退款
		$selectOrderResp = $this->orderService->selectOrder($param);
		if ($selectOrderResp->errCode != 0) {
			return $objectList;
		}
		$orderList = $selectOrderResp->data['list'];
		$planMap = array();
		if (!empty($orderList)) {
			foreach ($orderList as $order) {
				$orderId = (int)$order['orderId'];
				$planId = (int)$order['planId'];
				$userId = (int)$order['userId'];
				$amount = (int)$order['amount'];
				if ($orderId < 0 || $planId < 0 || $userId < 0 || $amount < 0) {
					continue;
				}
				if (!key_exists($planId, $planMap)) {
					$planMap[$planId] = 0;
				}
				$planMap[$planId] += $amount;
			}
		}
		for ($i = 0, $length = count($objectList); $i < $length; $i++) {
			$planId = (int)$objectList[$i][$key];
			$planSaleTicketAmount = (int)$planMap[$planId];
			$objectList[$i]['saleTicketAmount'] = $planSaleTicketAmount;
		}
		return $objectList;
    }

    //给方案订单设置方案信息
    public function setPlan($objectList, $key = 'planId') {
        if (!is_array($objectList) || count($objectList) <= 0) {
            return $objectList;
        }
        $planIdArr = array();
        foreach ($objectList as $object) {
            $planId = (int)$object[$key];
            if ($planId > 0) {
                $planIdArr[] = $planId;
            }
        }
		if (count($planIdArr) <= 0) {
			return $objectList;
		}
		$param = array();
		$param['planId'] = $planIdArr;
		$selectPlanResp = $this->planService->selectPlan($param);
		if ($selectPlanResp->errCode != 0) {
			return $objectList;
		}
		$planList = $selectPlanResp->data['list'];
		$planList = $this->setPlanSaleTicketAmount($planList);
		$planMap = array();
		foreach ($planList as $plan) {
			$planId = (int)$plan['planId'];
			if ($planId > 0) {
				$planMap[$planId] = $plan;
			}
		}
        for ($i = 0, $length = count($objectList); $i < $length; $i++) {
            $planId = (int)$objectList[$i][$key];
            if (!empty($planMap[$planId])) {
				$userId = (int)$planMap[$planId]['userId'];
                $planInfo = array();
                $planInfo['planNo'] = $this->common->encodeNo($userId, $planId);
                $planInfo['title'] = trim($planMap[$planId]['title']);
                $planInfo['amount'] = (int)$planMap[$planId]['amount'];
                $planInfo['content'] = trim($planMap[$planId]['content']);
                $planInfo['matchBeginTime'] = trim($planMap[$planId]['matchBeginTime']);
                $planInfo['saleTicketAmount'] = (int)$planMap[$planId]['saleTicketAmount'];
                $objectList[$i]['plan'] = $planInfo;
            }
        }
        return $objectList;
    }

    //每个都强制转换成字符串，不然, '总进球'时候 ios会崩溃
	private function toStringArray($arr) {
		if (empty($arr)) {
			$arr = array();
		}
		for ($i = 0, $length = count($arr); $i < $length; $i++) {
			$arr[$i] = $arr[$i] . '';
		}
		return $arr;
	}

	public function calculateMaxPrizeAmount($matchList, $ticketPassType, $ticketMultiple) {
		$resp = requireModule('Resp');
		$ticketPassType = explode(',', $ticketPassType);
		if (!is_array($matchList) || count($matchList) <= 0 || !is_array($ticketPassType) || count($ticketPassType) <= 0 || $ticketMultiple <= 0) {
			$resp->msg = '参数异常';
			return $resp;
		}
		$maxPrizeAmount = 0;
		$matchLength = count($matchList);
		foreach ($ticketPassType as $p) {
			$p = trim($p);
			$num = (int)preg_replace("/x1$/", "", $p);
			if ($num <= 0 || $num > 8 || $num > $matchLength) {
				$resp->msg = '过关方式异常';
				return $resp;
			}
			$zhArr = $this->common->ZH($matchList, $num);
			if (!is_array($zhArr) || count($zhArr) <= 0) {
				$resp->msg = '过关比赛异常';
				return $resp;
			}
			foreach ($zhArr as $matchArr) {
				$odds = 1;
				foreach ($matchArr as $r) {
					$matchId = (int)$r['matchId'];
					$oddsId = (int)$r['oddsId'];
					$bettypeOdds = $r['bettypeOdds'];
					$recommend = $r['recommend'];
					$recommendLength = count($recommend);
					if ($matchId <= 0 || $oddsId <= 0 || $recommendLength <= 0) {
						$resp->msg = '比赛信息异常';
						return $resp;
					}
					$recommendOdds = array();
					for ($x = 0; $x < $recommendLength; $x++) {
						$ro = (float)($bettypeOdds->{$recommend[$x]});
						if ($ro <= 0) {;
							$resp->msg = '比赛赔率异常';
							return $resp;
						}
						$recommendOdds[] = $ro;
					}
					$maxOdds = max($recommendOdds);
					$odds *= $maxOdds;
				}
				$sp = $this->common->roundSp($odds * 2, 2);
				$maxPrizeAmount += $sp * $ticketMultiple * 100;
			}
		}
		$resp->data = (int)$maxPrizeAmount;
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	public function calculateTicket($matchRecommend, $ticketPassType) {
		$resp = requireModule('Resp');
		$matchRecommend = json_decode($matchRecommend, true);
		$ticketPassType = explode(',', $ticketPassType);
		if (!is_array($matchRecommend) || count($matchRecommend) <= 0 || !is_array($ticketPassType) || count($ticketPassType) <= 0) {
			$resp->msg = '参数异常';
			return $resp;
		}
		$matchLength = count($matchRecommend);
		$ticketPassTypeMap = array();
		foreach ($ticketPassType as $p) {
			$p = trim($p);
			$num = (int)preg_replace("/x1$/", "", $p);
			if ($num <= 0 || $num > 8 || $num > $matchLength) {
				$resp->msg = '过关方式异常';
				return $resp;
			}
			$zhArr = $this->common->ZH($matchRecommend, $num);
			if (!is_array($zhArr) || count($zhArr) <= 0) {
				$resp->msg = '过关比赛异常';
				return $resp;
			}
			$curTicketUnit = 0;
			$curMatchRecommend = array();
			foreach ($zhArr as $matchArr) {
				$ticketUnit = 1;
				foreach ($matchArr as $r) {
					$matchId = (int)$r['matchId'];
					$oddsId = (int)$r['oddsId'];
					$recommend = $r['recommend'];
					if ($matchId <= 0 || $oddsId <= 0) {
						$resp->msg = '比赛信息异常';
						return $resp;
					}
					$ticketUnit *= count($recommend);
				}
				$curTicketUnit += $ticketUnit;
				$curMatchRecommend[] = trim(json_encode($matchArr));
			}
			$ticketPassTypeMap[$p] = array('ticketUnit' => $curTicketUnit, 'matchRecommend' => $curMatchRecommend);
		}
		$resp->data = $ticketPassTypeMap;
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	//算奖
	public function calculatePrize($matchRecommend, $matchList) {
		$resp = requireModule('Resp');
		$matchRecommend = json_decode($matchRecommend, true);
		if (!is_array($matchRecommend) || count($matchRecommend) <= 0 || !is_array($matchList) || count($matchList) <= 0) {
			$resp->msg = '参数异常';
			return $resp;
		}
		$prizeStatus = 0;
		$bettypeResultMap = array();
		$bettypePrizeMap = array();
		$prizeMap = array();
		$finished = true;
		$costAmount = 1;//成本(不是真正的成本，目的是用来计算盈利率的)
		$prizeAmount = 1;//奖金(不是真正的奖金，目的是用来计算盈利率的)
		foreach ($matchList as $match) {
            $type = (int)$match['type'];//比赛类型, 1=足球, 2=篮球
			$oddsId = (int)$match['oddsId'];
			$recommend = $match['recommend'];
			$bettypeContent = trim($match['bettypeContent']);
			$bettypeOdds = $match['bettypeOdds'];
			$concede = (float)$match['concede'];
			$halfResult = trim($match['halfResult']);
			$halfResultArr = explode(':', $halfResult);
			$result = trim($match['result']);
			$resultArr = explode(':', $result);
			$matchCancel = false;
			if ($type == 1) {
				$matchCancel = (bool)($halfResult == '取消' && $result == '取消');
			} else if ($type == 2) {
				$matchCancel = (bool)($result == '取消');
			}
			if (empty($recommend) || count($recommend) <= 0) {
				$resp->msg = '推荐选项异常';
				return $resp;
			}
			$rstMap = array();
			if ($matchCancel) {
				//不参与算奖
			} else if ((($type == 1 && !empty($halfResult) && !empty($halfResultArr) && count($halfResultArr) == 2) || $type==2) && !empty($result) && !empty($resultArr) && count($resultArr) == 2) {
			    //胜平负/让球胜平负
				if ($bettypeContent == 'SPF' || $bettypeContent == 'RQSPF') {
					$homeResult = (int)$resultArr[0]+$concede;
					$awayResult = (int)$resultArr[1];
					$rstMap['S'] = $homeResult > $awayResult;
					$rstMap['P'] = $homeResult == $awayResult;
					$rstMap['F'] = $homeResult < $awayResult;
				} else if ($bettypeContent == 'BF') {
					$homeResult = (int)$resultArr[0];
					$awayResult = (int)$resultArr[1];
					//胜map
					$sMap = array(
						'1:0' => false,
						'2:0' => false,
						'2:1' => false,
						'3:0' => false,
						'3:1' => false,
						'3:2' => false,
						'4:0' => false,
						'4:1' => false,
						'4:2' => false,
						'5:0' => false,
						'5:1' => false,
						'5:2' => false,
						'SQT' => false
					);
					//平map
					$pMap = array(
						'0:0' => false,
						'1:1' => false,
						'2:2' => false,
						'3:3' => false,
						'PQT' => false
					);
					//负map
					$fMap = array(
						'0:1' => false,
						'0:2' => false,
						'1:2' => false,
						'0:3' => false,
						'1:3' => false,
						'2:3' => false,
						'0:4' => false,
						'1:4' => false,
						'2:4' => false,
						'0:5' => false,
						'1:5' => false,
						'2:5' => false,
						'FQT' => false
					);
					$key = $homeResult.':'.$awayResult;
					if ($homeResult > $awayResult) {
						$sMap[$key] = key_exists($key, $sMap);
						$sMap['SQT'] = !$sMap[$key];
					} else if ($homeResult == $awayResult) {
						$pMap[$key] = key_exists($key, $pMap);
						$pMap['PQT'] = !$pMap[$key];
					} else if ($homeResult < $awayResult) {
						$fMap[$key] = key_exists($key, $fMap);
						$fMap['FQT'] = !$fMap[$key];
					}
					$rstMap = array_merge($sMap, $pMap, $fMap);
				} else if ($bettypeContent == 'ZJQ') {
					$key = (string)((int)$resultArr[0] + (int)$resultArr[1]);
					$rstMap = array(
						'0' => false,
						'1' => false,
						'2' => false,
						'3' => false,
						'4' => false,
						'5' => false,
						'6' => false,
						'7+' => false
					);
					$rstMap[$key] = key_exists($key, $rstMap);
					$rstMap['7+'] = !$rstMap[$key];
				} else if ($bettypeContent == 'BQC') {
					$halfHomeResult = (int)$halfResultArr[0];
					$halfAwayResult = (int)$halfResultArr[1];
					$homeResult = (int)$resultArr[0];
					$awayResult = (int)$resultArr[1];
					$rstMap = array(
						'SS' => ($halfHomeResult > $halfAwayResult) && ($homeResult > $awayResult),
						'SP' => ($halfHomeResult > $halfAwayResult) && ($homeResult == $awayResult),
						'SF' => ($halfHomeResult > $halfAwayResult) && ($homeResult < $awayResult),
						'PS' => ($halfHomeResult == $halfAwayResult) && ($homeResult > $awayResult),
						'PP' => ($halfHomeResult == $halfAwayResult) && ($homeResult == $awayResult),
						'PF' => ($halfHomeResult == $halfAwayResult) && ($homeResult < $awayResult),
						'FS' => ($halfHomeResult < $halfAwayResult) && ($homeResult > $awayResult),
						'FP' => ($halfHomeResult < $halfAwayResult) && ($homeResult == $awayResult),
						'FF' => ($halfHomeResult < $halfAwayResult) && ($homeResult < $awayResult)
					);
				} else if ($bettypeContent == 'SF' || $bettypeContent == 'RFSF'){
                    $awayResult  = (int)$resultArr[0];
                    $homeResult =  (int)$resultArr[1]+$concede;
                    $rstMap['S'] = $homeResult > $awayResult;
                    $rstMap['F'] = $homeResult < $awayResult;
                } else if ($bettypeContent == 'SFC') {
                    $awayResult = (int)$resultArr[0];
                    $homeResult = (int)$resultArr[1];
					$rstMap = array(
						'S1-5' => false,
						'S6-10' => false,
						'S11-15' => false,
						'S16-20' => false,
						'S21-25' => false,
						'S26+' => false,
						'F1-5' => false,
						'F6-10' => false,
						'F11-15' => false,
						'F16-20' => false,
						'F21-25' => false,
						'F26+' => false
					);
                    $gapValue = $homeResult - $awayResult;
                    $gapBegin = ceil(abs($gapValue)/5);
                    if (abs($gapValue) < 26) {
                        $keyGap = ($gapBegin*5-4).'-'.($gapBegin*5);
                    }else {
                        $keyGap = '26+';
                    }
                    if ($gapValue > 0) {
                        $key = 'S' . $keyGap;
                    } else {
                        $key = 'F' . $keyGap;
                    }
                    $rstMap[$key] = key_exists($key, $rstMap);
                } else if ($bettypeContent == 'DXF'){
                    $allScore= (int)$resultArr[0] + (int)$resultArr[1];
                    $rstMap['D'] = $allScore > $concede;
                    $rstMap['X'] = $allScore < $concede;
                }
			} else {
				//只要有一场没有比赛结果", 后续比赛不算奖
				$finished = false;
				$prizeStatus = 0;
			}
			$costAmount *= count($recommend);
			$prize = array();
			if ($matchCancel) {
				$prizeAmount *= count($recommend);
			} else {
				foreach ($recommend as $r) {
					$r = trim($r);
					if ($rstMap[$r]) {
						$prizeAmount *= (float)$bettypeOdds->$r;
						$prize[] = $r;
					}
				}
			}
			$bettypePrize = array();
			foreach ($rstMap as $key => $value) {
				if ((bool)$value) {
					$bettypePrize[] = (string)$key;
				}
			}
			if (empty($rstMap) || count($rstMap) <= 0) {
				$rstMap = new \stdClass();
			}
			//记录每个赔率的中奖情况
			$prizeMap[$oddsId] = $prize;
			$bettypeResultMap[$oddsId] = $rstMap;
			$bettypePrizeMap[$oddsId] = $bettypePrize;
			//中奖状态, 0=未开奖, 1=已中奖, 2=未中奖
			if ($finished && $prizeStatus != 2) {
				if ($matchCancel || count($prize) > 0) {
					$prizeStatus = 1;
				} else {
					$prizeStatus = 2;
				}
			}
		}
		for ($j = 0, $len = count($matchRecommend); $j < $len; $j++) {
			$oddsId = (int)$matchRecommend[$j]['oddsId'];
			if ($oddsId > 0 && key_exists($oddsId, $prizeMap) && key_exists($oddsId, $bettypeResultMap) && key_exists($oddsId, $bettypePrizeMap)) {
				$matchRecommend[$j]['prize'] = $prizeMap[$oddsId];
				$matchRecommend[$j]['bettypeResult'] = $bettypeResultMap[$oddsId];
				$matchRecommend[$j]['bettypePrize'] = $bettypePrizeMap[$oddsId];
			}
		}
		$matchRecommend = json_encode($matchRecommend);
		$data = array(
			'prizeStatus' => $prizeStatus,
			'costAmount' => $costAmount,//成本(不是真正的成本，目的是用来计算盈利率的)
			'prizeAmount' => $prizeAmount,//奖金(不是真正的奖金，目的是用来计算盈利率的)
			'matchRecommend' => $matchRecommend
		);
		$resp->data = $data;
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	public function matchListIsSale($matchList) {
		$resp = requireModule('Resp');
		$matchLength = count($matchList);
		if (!is_array($matchList) || $matchLength <= 0) {
			$resp->msg = '比赛不存在';
			return $resp;
		}
		//单关是否允许销售
		if ($matchLength == 1) {
			if ($matchList[0]['single'] != 1) {
				$resp->msg = '该比赛不允许单关销售';
				return $resp;
			}
		} else if ($matchLength > 8) {
			$resp->msg = '比赛不能超过8场';
			return $resp;
		}
		//获取最早开赛时间
		$matchBeginTime = null;
		foreach ($matchList as $match) {
			$bettypeContent = trim($match['bettypeContent']);
			$bettypeName = trim($match['bettypeName']);
			if ($bettypeContent == 'ZJQ' && $matchLength > 6) {
				$resp->msg = '包含"总进球"玩法的比赛,最多选6场';
				return $resp;
			} else if (($bettypeContent == 'BF' || $bettypeContent == 'BQC' || $bettypeContent == 'SFC') && $matchLength > 4) {
				$resp->msg = '包含"'. $bettypeName . '"玩法的比赛,最多选4场';
				return $resp;
			}
			$beginTime = trim($match['beginTime']);
			if (!empty($beginTime) && (empty($matchBeginTime) || $beginTime < $matchBeginTime)) {
				$matchBeginTime = $beginTime;
			}
		}
		if (empty($matchBeginTime)) {
			$resp->msg = '比赛开始时间有误';
			return $resp;
		}
		$aheadTime = 10*60;//提前15分钟截止->1.22修改成提前10分钟
		$time = time() + $aheadTime;
		$mbTime = strtotime($matchBeginTime);
		if ($mbTime <= $time) {
			$resp->msg = '比赛已经截止出票';
			return $resp;
		}
		$curDate = date("Y-m-d H:i:s", $time);
		$curDay = date("Y-m-d", $time);
		$curWeek = date('w', $time);//0（表示星期天）到 6（表示星期六）
		$type = (int)$matchList[0]['type'];
		//不可销售的时间段
		$beginDate = null;
		$endDate = null;
		if ($type == 1) {
			if (in_array($curWeek, array(0,1))) {
				$beginDate = $curDay.' 01:00:00';
				$endDate = $curDay.' 09:00:00';
			} else if (in_array($curWeek, array(2,3,4,5,6))) {
				$beginDate = $curDay.' 00:00:00';
				$endDate = $curDay.' 09:00:00';
			}
			//2018世界杯销售时间
			if (in_array($curDay, array('2018-06-16','2018-06-18','2018-06-19','2018-06-20','2018-06-21','2018-06-22','2018-06-23','2018-06-24','2018-06-25','2018-06-26','2018-06-27','2018-06-28','2018-06-29','2018-07-01','2018-07-02','2018-07-03','2018-07-04','2018-07-07','2018-07-08','2018-07-11','2018-07-12'))) {
                $beginDate = $curDay.' 02:00:00';
                $endDate = $curDay.' 09:00:00';
            } else if (in_array($curDay, array('2018-06-17'))) {
                $beginDate = $curDay.' 03:00:00';
                $endDate = $curDay.' 09:00:00';
            }
		} else if ($type == 2) {
			if (in_array($curWeek, array(3,4))) {
				$beginDate = $curDay.' 00:00:00';
				$endDate = $curDay.' 07:30:00';
			} else if (in_array($curWeek, array(2,5,6))) {
				$beginDate = $curDay.' 00:00:00';
				$endDate = $curDay.' 09:00:00';
			} else if (in_array($curWeek, array(0,1))) {
				$beginDate = $curDay.' 01:00:00';
				$endDate = $curDay.' 09:00:00';
			}
		}
		if (empty($beginDate) || empty($endDate)) {
			$resp->msg = '不可销售的时间段异常';
			return $resp;
		}
		$beginDate = date("Y-m-d H:i:s", strtotime($beginDate) - $aheadTime);
		$endDate = date("Y-m-d H:i:s", strtotime($endDate) + $aheadTime);
		if ($curDate >= $beginDate && $matchBeginTime <= $endDate) {
			$resp->msg = '比赛已经截止出票';
			return $resp;
		}
		//临时禁止出票
		$resp->errCode = -1;
		$resp->msg = '成功';
		return $resp;
	}

	//给每个对象设置用户信息
	public function setUser($objectList, $key = 'userId') {
		if (!is_array($objectList) || count($objectList) <= 0) {
			return $objectList;
		}
		$userIdArr = array();
		foreach ($objectList as $object) {
			$userId = (int)$object[$key];
			if ($userId > 0) {
				$userIdArr[] = $userId;
			}
		}
		$userList = array();
		if (count($userIdArr) > 0) {
			$param = array();
			$param['userId'] = $userIdArr;
			$selectUserResp = $this->userService->selectUser($param);
			if ($selectUserResp->errCode == 0 && !empty($selectUserResp->data['list'])) {
				$userList = $selectUserResp->data['list'];
			}
		}
		$userMap = array();
		foreach ($userList as $user) {
			$userId = (int)$user['userId'];
			if ($userId > 0) {
				$userMap[$userId] = $user;
			}
		}
		for ($i = 0, $length = count($objectList); $i < $length; $i++) {
			$userId = (int)$objectList[$i][$key];
			if (!empty($userMap[$userId])) {
				$user = array();
				$user['userNo'] = $this->common->encodeNo($userId, $userId+12345678);
				$user['tag'] = trim($userMap[$userId]['tag']);
				$user['nickName'] = trim($userMap[$userId]['nickName']);
				$user['realName'] = trim($userMap[$userId]['realName']);
				$user['profileImg'] = trim($userMap[$userId]['profileImg']);
				$user['personalImg'] = trim($userMap[$userId]['personalImg']);
				$user['remark'] = trim($userMap[$userId]['remark']);
                $userRight = (int)$userMap[$userId]['userRight'];
                $user['userRight'] = $this->common->getUserRight($userRight);
				$objectList[$i]['user'] = $user;
			}
		}
		return $objectList;
	}

	//给每个对象设置用户信息
	public function setResourceUrl($objectList, $key = 'resourceId') {
		if (!is_array($objectList) || count($objectList) <= 0) {
			return $objectList;
		}
		$resourceIdArr = array();
		foreach ($objectList as $object) {
			$resourceId = trim($object[$key]);
			if (empty($resourceId)) {
				continue;
			}
			$resourceId = explode(',', $resourceId);
			if (is_array($resourceId) && count($resourceId) > 0) {
				$resourceIdArr = array_merge($resourceIdArr, $resourceId);
			}
		}
		$resourceList = array();
		if (count($resourceIdArr) > 0) {
			$param = array();
			$param['resourceId'] = $resourceIdArr;
			$selectResourceResp = $this->resourceService->selectResource($param);
			if ($selectResourceResp->errCode == 0 && !empty($selectResourceResp->data['list'])) {
				$resourceList = $selectResourceResp->data['list'];
			}
		}
		$resourceMap = array();
		foreach ($resourceList as $resource) {
			$resourceId = (int)$resource['resourceId'];
			if ($resourceId > 0) {
				$resourceMap[$resourceId] = $resource;
			}
		}
		//类型, 1=图片, 2=声音, 3=视频
		$resourceTypeMap = array('1' => 'image', '2' => 'audio', '3' => 'video');
		global $curEnvConfig;
		$resourceUrl = trim($curEnvConfig->resourceUrl);
		for ($i = 0, $length = count($objectList); $i < $length; $i++) {
			$resourceId = trim($objectList[$i][$key]);
			$resourceId = explode(',', $resourceId);
			if (!empty($resourceId) && is_array($resourceId) && count($resourceId) > 0) {
				$resourceUrlList = array();
				foreach ($resourceId as $id) {
					if (!empty($resourceMap[$id])) {
						$type = (int)$resourceMap[$id]['type'];
						$type = trim($resourceTypeMap[$type]);
						$extension = trim($resourceMap[$id]['extension']);
						$url = trim($resourceMap[$id]['url']);
						if (empty($url)) {
							$url = $resourceUrl.$type.'/'.$id;
							if (!empty($extension)) {
								$url .= '.'.$extension;
							}
						}
						$resourceUrlList[] = $url;
					}
				}
				$objectList[$i]['resourceList'] = $resourceUrlList;
			}
		}
		return $objectList;
	}

	//给每个对象设置用户信息
	public function setResourcePath($objectList, $key = 'resourceId') {
		if (!is_array($objectList) || count($objectList) <= 0) {
			return $objectList;
		}
		$resourceIdArr = array();
		foreach ($objectList as $object) {
			$resourceId = trim($object[$key]);
			if (empty($resourceId)) {
				continue;
			}
			$resourceId = explode(',', $resourceId);
			if (is_array($resourceId) && count($resourceId) > 0) {
				$resourceIdArr = array_merge($resourceIdArr, $resourceId);
			}
		}
		$resourceList = array();
		if (count($resourceIdArr) > 0) {
			$param = array();
			$param['resourceId'] = $resourceIdArr;
			$selectResourceResp = $this->resourceService->selectResource($param);
			if ($selectResourceResp->errCode == 0 && !empty($selectResourceResp->data['list'])) {
				$resourceList = $selectResourceResp->data['list'];
			}
		}
		$resourceMap = array();
		foreach ($resourceList as $resource) {
			$resourceId = (int)$resource['resourceId'];
			if ($resourceId > 0) {
				$resourceMap[$resourceId] = $resource;
			}
		}
		//类型, 1=图片, 2=声音, 3=视频
		$resourceTypeMap = array('1' => 'image', '2' => 'audio', '3' => 'video');
		global $staticPath;
		for ($i = 0, $length = count($objectList); $i < $length; $i++) {
			$resourceId = trim($objectList[$i][$key]);
			$resourceId = explode(',', $resourceId);
			if (!empty($resourceId) && is_array($resourceId) && count($resourceId) > 0) {
				$resourceUrlList = array();
				foreach ($resourceId as $id) {
					if (!empty($resourceMap[$id])) {
						$type = (int)$resourceMap[$id]['type'];
						$type = trim($resourceTypeMap[$type]);
						$extension = trim($resourceMap[$id]['extension']);
						$path = $staticPath.$type.'/'.$id;
						if (!empty($extension)) {
							$path .= '.'.$extension;
						}
						$resourceUrlList[] = $path;
					}
				}
				$objectList[$i]['resourceList'] = $resourceUrlList;
			}
		}
		return $objectList;
	}

	//给每个对象设置统计信息
	public function setStatistics($objectList, $idKey, $financeType, $type, $property) {
		$idKey = trim($idKey);
		$financeType = (int)$financeType;
		$type = (int)$type;
		$property = trim($property);
		if (!is_array($objectList) || count($objectList) <= 0 || empty($idKey) || empty($property)) {
			return $objectList;
		}
		$idArr = array();
		foreach ($objectList as $object) {
			$id = (int)$object[$idKey];
			if ($id > 0) {
				$idArr[] = $id;
			}
		}
		$statisticsMap = array();
		if (count($idArr) > 0) {
			//查看收益
			$param = array();
			$param['financeType'] = $financeType;
			$param[$idKey] = $idArr;
			$param['type'] = $type;
			$selectFinanceIncomeByGroupResp = $this->financeService->selectFinanceIncomeByGroup($param);
			if ($selectFinanceIncomeByGroupResp->errCode == 0) {
				$list = $selectFinanceIncomeByGroupResp->data['list'];
				if (!empty($list)) {
					foreach ($list as $l) {
						$id = (int)$l[$idKey];
						if ($id > 0) {
							$statisticsMap[$id] = $l;
						}
					}
				}
			}
		}
		for ($i = 0, $length = count($objectList); $i < $length; $i++) {
			$id = (int)$objectList[$i][$idKey];
			if (!empty($statisticsMap[$id])) {
				$statistics = array();
				$statistics['count'] = (int)$statisticsMap[$id]['count'];
				$statistics['amount'] = (int)$statisticsMap[$id]['amount'];
				$objectList[$i][$property] = $statistics;
			}
		}
		return $objectList;
	}

	//按用户给每个方案设置是否可以访问
	public function setPlanAccess($planList, $userId) {
		$planAccess = $this->common->isMock();
		$userId = (int)$userId;
		if (!is_array($planList) || count($planList) <= 0) {
			return $planList;
		}
		$planIdArr = array();
		for ($i = 0, $length = count($planList); $i < $length; $i++) {
			$planId = (int)$planList[$i]['planId'];
			$planUserId = (int)$planList[$i]['userId'];
			$planAmount = (int)$planList[$i]['amount'];
			$saleTime = trim($planList[$i]['saleTime']);
			$saleTime = (int)strtotime($saleTime);
			if ($saleTime < 0) {
				$saleTime = 0;
			}
			//检查“时间,金额,方案用户”是否允许查看
			if ($planAccess || $userId == $planUserId || $planAmount <= 0 || $saleTime <= time()) {
				$planList[$i]['access'] = true;
			} else if ($planId > 0) {
				$planIdArr[] = $planId;
			}
		}
		if ($userId <= 0 ) {
			return $planList;
		}
		$accessMap = array();
		if (count($planIdArr) > 0) {
			$param = array();
			$param['orderType'] = 0;
			$param['userId'] = $userId;
			$param['planId'] = $planIdArr;
			$param['status'] = 2;
			$selectOrderResp = $this->orderService->selectOrder($param);
			if ($selectOrderResp->errCode == 0) {
				$list = $selectOrderResp->data['list'];
				if (!empty($list)) {
					foreach ($list as $l) {
						$planId = (int)$l['planId'];
						if ($planId > 0) {
							$accessMap[$planId] = true;
						}
					}
				}
			}
		}
		for ($i = 0, $length = count($planList); $i < $length; $i++) {
			$planId = (int)$planList[$i]['planId'];
			//检查用户是否购买方案(生成付款成功订单)
			if (empty($planList[$i]['access']) && !empty($accessMap[$planId])) {
				$planList[$i]['access'] = true;
			}
		}
		return $planList;
	}

	//按用户给每个订单关联的方案设置是否可以访问
	public function setOrderPlanAccess($orderList, $userId) {
		$userId = (int)$userId;
		if (!is_array($orderList) || count($orderList) <= 0) {
			return $orderList;
		}
		$matchMap = array();
		$planIdArr = array();
		for ($i = 0, $length = count($orderList); $i < $length; $i++) {
			$planId = (int)$orderList[$i]['planId'];
			$matchList = $orderList[$i]['matchList'];
			if ($planId > 0) {
				$planIdArr[] = $planId;
				$matchMap[$planId] = $matchList;
			}
		}
		$param = array();
		$param['planId'] = $planIdArr;
		$selectPlanResp = $this->planService->selectPlan($param);
		if ($selectPlanResp->errCode != 0) {
			return $orderList;
		}
		$planList = $selectPlanResp->data['list'];
		if (empty($planList) || count($planList) <= 0) {
			return $orderList;
		}
		for ($i = 0, $length = count($planList); $i < $length; $i++) {
			$planId = (int)$planList[$i]['planId'];
			if (!empty($matchMap[$planId])) {
				$planList[$i]['matchList'] = $matchMap[$planId];
			}
		}
		$planList = $this->setPlanAccess($planList, $userId);
		$accessMap = array();
		foreach ($planList as $plan) {
			$planId = (int)$plan['planId'];
			if ($planId > 0) {
				$accessMap[$planId] = (bool)$plan['access'];
			}
		}
		for ($i = 0, $length = count($orderList); $i < $length; $i++) {
			$planId = (int)$orderList[$i]['planId'];
			if (!empty($accessMap[$planId])) {
				$orderList[$i]['planAccess'] = (bool)$accessMap[$planId];
			}
		}
		return $orderList;
	}

	//给每个用户设置连红和10场胜率
	public function setUserWinStatus($objectList, $key = 'userId') {
		if (!is_array($objectList) || count($objectList) <= 0) {
			return $objectList;
		}
		$userIdArr = array();
		foreach ($objectList as $object) {
			$userId = (int)$object[$key];
			if ($userId > 0) {
				$userIdArr[] = $userId;
			}
		}
		$continueWinEndMap = array();
		$continueWinMap = array();
		$winCountMap = array();
		if (count($userIdArr) > 0) {
			$param = array();
			$param['userId'] = $userIdArr;
			$param['planStatus'] = 2;//方案状态：1=未结束, 2=已结束
			$param['prizeStatus'] = array(1,2);
			$param['publish'] = 1;
			$param['pageNum'] = 1;
			$param['pageSize'] = 10000;
			$selectPlanResp = $this->planService->selectPlan($param);
			if ($selectPlanResp->errCode == 0) {
				$planList = $selectPlanResp->data['list'];
				if (!empty($planList)) {
					//设置连红
					foreach ($planList as $plan) {
						$userId = (int)$plan['userId'];
						$prizeStatus = (int)$plan['prizeStatus'];
						if ($continueWinEndMap[$userId]) {
							continue;
						}
						if (!key_exists($userId, $continueWinMap)) {
							$continueWinMap[$userId] = 0;
						}
						//中奖状态, 0=未开奖, 1=已中奖, 2=未中奖
						if ($prizeStatus == 1) {
							$continueWinMap[$userId] += 1;
						} else {
							$continueWinEndMap[$userId] = true;
						}
					}
					//设置10场胜率
					foreach ($planList as $plan) {
						$userId = (int)$plan['userId'];
						$prizeStatus = (int)$plan['prizeStatus'];
						if ($userId <= 0) {
							continue;
						}
						if (!key_exists($userId, $winCountMap)) {
							$winCountMap[$userId] = array('win' => 0, 'lost' => 0);
						}
						if (($winCountMap[$userId]['win'] + $winCountMap[$userId]['lost']) >= 10) {
							continue;
						}
						if ($prizeStatus == 1) {
                            $winCountMap[$userId]['win']++;
						} else if($prizeStatus == 2) {
                            $winCountMap[$userId]['lost']++;
						}
					}
				}
			}
		}
		for ($i = 0, $length = count($objectList); $i < $length; $i++) {
			$userId = (int)$objectList[$i][$key];
			//设置连红
			$objectList[$i]['continueWin'] = (int)$continueWinMap[$userId];
			//设置10场胜率
			$winCount = 0;
			if ($userId > 0 && is_array($winCountMap[$userId])) {
				$win = (int)$winCountMap[$userId]['win'];
				if ($win >= 6) {
					$winCount = $win;
				}
			}
			$objectList[$i]['winCount'] = $winCount;
		}
		return $objectList;
	}

	public function setUserPlanRate($objectList, $key = 'userId') {
        if (!is_array($objectList) || count($objectList) <= 0) {
            return $objectList;
        }
        $userIdArr = array();
        foreach ($objectList as $object) {
            $userId = (int)$object[$key];
            if ($userId > 0) {
                $userIdArr[] = $userId;
            }
        }
		if (count($userIdArr) <= 0) {
			return $objectList;
		}
		$userPlanRate = $this->getUserPlanRate($userIdArr);
        for ($i = 0, $length = count($objectList); $i < $length; $i++) {
            $userId = (int)$objectList[$i][$key];
			$winRate = (float)$userPlanRate[$userId]['winRate'];
			$profitRate = (float)$userPlanRate[$userId]['profitRate'];
			if ($winRate < 55) {
				$winRate = 0;
			}
			if ($profitRate < 8) {
				$profitRate = 0;
			}
            //设置胜率
            $objectList[$i]['winRate'] = $winRate;
            //设置盈利率
            $objectList[$i]['profitRate'] = $profitRate;
        }
        return $objectList;
    }

	public function getUserPlanRate($userIdArr = null) {
		$param = array();
		$param['userId'] = $userIdArr;
		$param['publish'] = 1;  //上架
		$param['beginTime'] = date('Y-m-d', strtotime('-7 days'));  //7天
		$selectPlanResp = $this->planService->selectPlan($param);
		if ($selectPlanResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$planList = $selectPlanResp->data['list'];
		$userPlanMap = array();
		foreach ($planList as $plan) {
			$userId = (int)$plan['userId'];
			$prizeStatus = (int)$plan['prizeStatus'];
			$costAmount = (int)$plan['costAmount'];
			$prizeAmount = (float)$plan['prizeAmount'];
			$saleTime = strtotime(trim($plan['saleTime']));
			if ($userId <= 0) {
				continue;
			}
			if (!key_exists($userId, $userPlanMap)) {
				$userPlanMap[$userId] = array(
					"costAmount" => 0,
					"prizeAmount" => 0,
					'salePlanCount' => 0,//在售的数量
					"resultPlanCount" => 0,//有赛果的数量
					"winPlanCount" => 0//赢的数量
				);
			}
			if ($prizeStatus == 0) {
				if (time() < $saleTime) {
					$userPlanMap[$userId]['salePlanCount']++;
				}
			} else if ($prizeStatus == 1 || $prizeStatus == 2) {
				$userPlanMap[$userId]['costAmount'] += $costAmount;
				$userPlanMap[$userId]['prizeAmount'] += $prizeAmount;
				$userPlanMap[$userId]['resultPlanCount']++;
				if ($prizeStatus == 1) {
					$userPlanMap[$userId]['winPlanCount']++;
				}
			}
		}
		foreach ($userPlanMap as $userId => $info) {
			$userId = (int)$userId;
			$costAmount = (int)$info['costAmount'];
			$prizeAmount = (float)$info['prizeAmount'];
			$resultPlanCount = (int)$info['resultPlanCount'];
			$winPlanCount = (int)$info['winPlanCount'];
			$winRate = 0;
			$profitRate = 0;
			if ($resultPlanCount != 0) {//不能让分母为0
				$winRate = sprintf('%.2f', $winPlanCount * 100 / $resultPlanCount);
			}
			if ($costAmount != 0) {//不能让分母为0
				$profitRate = sprintf('%.2f', ($prizeAmount - $costAmount) * 100 / $costAmount);
			}
			if ($userId <= 0) {
				continue;
			}
			$userPlanMap[$userId]['winRate'] = $winRate;
			$userPlanMap[$userId]['profitRate'] = $profitRate;
		}
		return $userPlanMap;
	}

	public function setUserFinance($userId) {
		$resp = requireModule('Resp');
		$userId = (int)$userId;
		if ($userId <= 0) {
			$resp->msg = 'userId有误';
			return $resp;
		}
		//更新方案资金体系
		$doSetUserFinanceResp = $this->doSetUserFinance(0, $userId);
		if ($doSetUserFinanceResp->errCode != 0) {
			$resp->msg = $doSetUserFinanceResp->msg;
			return $resp;
		}
		//更新出票资金体系
		$doSetUserFinanceResp = $this->doSetUserFinance(1, $userId);
		if ($doSetUserFinanceResp->errCode != 0) {
			$resp->msg = $doSetUserFinanceResp->msg;
			return $resp;
		}
	}

	private function doSetUserFinance($financeType, $userId) {
		$resp = requireModule('Resp');
		$financeType = (int)$financeType;
		$userId = (int)$userId;
		if ($userId <= 0) {
			$resp->msg = 'userId有误';
			return $resp;
		}
		$selectUserByIdResp = $this->userService->selectUserById($userId);
		if ($selectUserByIdResp->errCode != 0) {
			$resp->msg = $selectUserByIdResp->msg;
			return $resp;
		}
		$user = $selectUserByIdResp->data;
		if (empty($user)) {
			$resp->msg = '查询用户有误';
			return $resp;
		}
		$nickName = trim($user['nickName']);
		$realName = trim($user['realName']);
		//查询用户资金
		$selectFinanceByUserIdResp = $this->financeService->selectFinanceByUserId($financeType, $userId);
		if ($selectFinanceByUserIdResp->errCode != 0) {
			$resp->msg = '查询资金有误';
			return $resp;
		}
		$finance = $selectFinanceByUserIdResp->data;
		$financeId = (int)$finance['financeId'];
		$dataVersion = (int)$finance['dataVersion'];
		$cashConsumeSumAmount = 0;
		$chargeConsumeSumAmount = 0;
		$incomeConsumeSumAmount = 0;
		$couponConsumeSumAmount = 0;
		$consumeSumAmount = 0;
		$recommendIncomeSumAmount = 0;
		$spreadIncomeSumAmount = 0;
		$prizeIncomeSumAmount = 0;
		$divideIncomeSumAmount = 0;
		$incomeSumAmount = 0;
		$withdrawingSumAmount = 0;
		$withdrewSumAmount = 0;
		$withdrawSumAmount = 0;
		$userChargeSumAmount = 0;
		$platformChargeSumAmount = 0;
		$chargeSumAmount = 0;
		$chargeFreezeSumAmount = 0;
		$incomeFreezeSumAmount = 0;
		$chargeAmount = 0;
		$incomeAmount = 0;
		//查询消费
		$param = array();
		$param['financeType'] = $financeType;//资金类型, 0=方案, 1=出票
		$param['userId'] = $userId;
		$param['type'] = array(1,2,3,4);//类型, 1=现金消费, 2=充值消费, 3=收益消费, 4=优惠券消费
		$selectFinanceConsumeByUserGroupTypeResp = $this->financeService->selectFinanceConsumeByUserGroupType($param);
		if ($selectFinanceConsumeByUserGroupTypeResp->errCode != 0) {
			$resp->msg = '查询消费有误';
			return $resp;
		}
		$financeConsumeList = $selectFinanceConsumeByUserGroupTypeResp->data['list'];
		if (!empty($financeConsumeList) && is_array($financeConsumeList) && count($financeConsumeList) > 0) {
			foreach ($financeConsumeList as $financeConsume) {
				$type = (int)$financeConsume['type'];
				$amount = (int)$financeConsume['amount'];
				if ($type == 1) {
					$cashConsumeSumAmount = $amount;
				} else if ($type == 2) {
					$chargeConsumeSumAmount = $amount;
				} else if ($type == 3) {
					$incomeConsumeSumAmount = $amount;
				} else if ($type == 4) {
					$couponConsumeSumAmount = $amount;
				}
			}
			$consumeSumAmount = $cashConsumeSumAmount+$chargeConsumeSumAmount+$incomeConsumeSumAmount+$couponConsumeSumAmount;
		}
		//查询收益
		$param = array();
		$param['financeType'] = $financeType;//资金类型, 0=方案, 1=出票
		$param['userId'] = $userId;
		$param['type'] = array(1,2);//类型, 方案(1=推荐收益, 2=推广收益), 出票(1=中奖收益,1=中奖收益)
		$selectFinanceIncomeByUserGroupTypeResp = $this->financeService->selectFinanceIncomeByUserGroupType($param);
		if ($selectFinanceIncomeByUserGroupTypeResp->errCode != 0) {
			$resp->msg = '查询消费有误';
			return $resp;
		}
		$financeIncomeList = $selectFinanceIncomeByUserGroupTypeResp->data['list'];
		if (!empty($financeIncomeList) && is_array($financeIncomeList) && count($financeIncomeList) > 0) {
			foreach ($financeIncomeList as $financeIncome) {
				$type = (int)$financeIncome['type'];
				$amount = (int)$financeIncome['amount'];//不要验证amount小于0，因为可能有负数的amount --> 补扣收益
				if ($financeType == 0) {
					if ($type == 1) {
						$recommendIncomeSumAmount = $amount;
					} else if ($type == 2) {
						$spreadIncomeSumAmount = $amount;
					}
				} else if ($financeType == 1) {
					if ($type == 1) {
						$prizeIncomeSumAmount = $amount;
					} else if ($type == 2) {
						$divideIncomeSumAmount = $amount;
					}
				}
			}
			if ($financeType == 0) {
				$incomeSumAmount = $recommendIncomeSumAmount+$spreadIncomeSumAmount;
			} else if ($financeType == 1) {
				$incomeSumAmount = $prizeIncomeSumAmount+$divideIncomeSumAmount;
			}
		}
		//查询提款
		$param = array();
		$param['financeType'] = $financeType;//资金类型, 0=方案, 1=出票
		$param['userId'] = $userId;
		$param['status'] = array(1,2,3,5);//1=未审核, 2=已审核, 3=已打款, 4=已拒绝, 5=打款中
		$selectFinanceWithdrawByUserGroupStatusResp = $this->financeService->selectFinanceWithdrawByUserGroupStatus($param);
		if ($selectFinanceWithdrawByUserGroupStatusResp->errCode != 0) {
			$resp->msg = '查询提款有误';
			return $resp;
		}
		$financeWithdrawList = $selectFinanceWithdrawByUserGroupStatusResp->data['list'];
		if (!empty($financeWithdrawList) && is_array($financeWithdrawList) && count($financeWithdrawList) > 0) {
			$status1Amount = 0;
			$status2Amount = 0;
			$status3Amount = 0;
			$status5Amount = 0;
			foreach ($financeWithdrawList as $financeWithdraw) {
				$status = (int)$financeWithdraw['status'];
				$amount = (int)$financeWithdraw['amount'];
				if ($status == 1) {
					$status1Amount = $amount;
				} else if ($status == 2) {
					$status2Amount = $amount;
				} else if ($status == 3) {
					$status3Amount = $amount;
				} else if ($status == 5) {
					$status5Amount = $amount;
				}
			}
			$withdrawingSumAmount = $status1Amount+$status2Amount+$status5Amount;
			$withdrewSumAmount = $status3Amount;
			$withdrawSumAmount = $withdrawingSumAmount+$withdrewSumAmount;
		}
		//查询充值
		$param = array();
		$param['financeType'] = $financeType;//资金类型, 0=方案, 1=出票
		$param['userId'] = $userId;
		$param['type'] = array(1,2);//类型, 1=用户充值, 2=平台充值
		$selectFinanceChargeByUserGroupTypeResp = $this->financeService->selectFinanceChargeByUserGroupType($param);
		if ($selectFinanceChargeByUserGroupTypeResp->errCode != 0) {
			$resp->msg = '查询消费有误';
			return $resp;
		}
		$financeChargeList = $selectFinanceChargeByUserGroupTypeResp->data['list'];
		if (!empty($financeChargeList) && is_array($financeChargeList) && count($financeChargeList) > 0) {
			foreach ($financeChargeList as $financeCharge) {
				$type = (int)$financeCharge['type'];
				$amount = (int)$financeCharge['amount'];//不要验证amount小于0，因为可能有负数的amount --> 充错米粒 --> 人工扣款转彩金
				if ($type == 1) {
					$userChargeSumAmount = $amount;
				} else if ($type == 2) {
					$platformChargeSumAmount = $amount;
				}
			}
			$chargeSumAmount = $userChargeSumAmount+$platformChargeSumAmount;
		}
		//查询冻结
		$param = array();
		$param['financeType'] = $financeType;//资金类型, 0=方案, 1=出票
		$param['userId'] = $userId;
		$param['type'] = array(1,2);//类型, 1=充值, 2=收益
		$param['status'] = 1;//状态, 1=冻结, 2=解冻
		$selectFinanceFreezeByUserGroupTypeResp = $this->financeService->selectFinanceFreezeByUserGroupType($param);
		if ($selectFinanceFreezeByUserGroupTypeResp->errCode != 0) {
			$resp->msg = '查询冻结有误';
			return $resp;
		}
		$financeFreezeList = $selectFinanceFreezeByUserGroupTypeResp->data['list'];
		if (!empty($financeFreezeList) && is_array($financeFreezeList) && count($financeFreezeList) > 0) {
			foreach ($financeFreezeList as $financeFreeze) {
				$type = (int)$financeFreeze['type'];
				$amount = (int)$financeFreeze['amount'];//不要验证amount小于0，因为可能有负数的amount
				if ($type == 1) {
					$chargeFreezeSumAmount = $amount;
				} else if ($type == 2) {
					$incomeFreezeSumAmount = $amount;
				}
			}
		}
		$chargeAmount = $chargeSumAmount-$chargeConsumeSumAmount-$chargeFreezeSumAmount;
		$incomeAmount = $incomeSumAmount-$withdrawSumAmount-$incomeConsumeSumAmount-$incomeFreezeSumAmount;
		//添加或更新资金明显
		$param = array();
		$param['nickName'] = $nickName;
		$param['realName'] = $realName;
		$param['cashConsumeSumAmount'] = $cashConsumeSumAmount;
		$param['chargeConsumeSumAmount'] = $chargeConsumeSumAmount;
		$param['incomeConsumeSumAmount'] = $incomeConsumeSumAmount;
		$param['couponConsumeSumAmount'] = $couponConsumeSumAmount;
		$param['consumeSumAmount'] = $consumeSumAmount;
		$param['recommendIncomeSumAmount'] = $recommendIncomeSumAmount;
		$param['spreadIncomeSumAmount'] = $spreadIncomeSumAmount;
		$param['prizeIncomeSumAmount'] = $prizeIncomeSumAmount;
		$param['divideIncomeSumAmount'] = $divideIncomeSumAmount;
		$param['incomeSumAmount'] = $incomeSumAmount;
		$param['withdrawingSumAmount'] = $withdrawingSumAmount;
		$param['withdrewSumAmount'] = $withdrewSumAmount;
		$param['withdrawSumAmount'] = $withdrawSumAmount;
		$param['userChargeSumAmount'] = $userChargeSumAmount;
		$param['platformChargeSumAmount'] = $platformChargeSumAmount;
		$param['chargeSumAmount'] = $chargeSumAmount;
		$param['chargeFreezeSumAmount'] = $chargeFreezeSumAmount;
		$param['incomeFreezeSumAmount'] = $incomeFreezeSumAmount;
		$param['chargeAmount'] = $chargeAmount;
		$param['incomeAmount'] = $incomeAmount;
		if (!empty($finance) && $financeId > 0) {
			$param['financeId'] = $financeId;
			$param['dataVersion'] = $dataVersion;
			$updateFinanceResp = $this->financeService->updateFinance($param);
			if ($updateFinanceResp->errCode != 0) {
				$resp->msg = '更新资金明细有误';
				return $resp;
			}
		} else {
			$param['financeType'] = $financeType;//资金类型, 0=方案, 1=出票
			$param['userId'] = $userId;
			$insertFinanceResp = $this->financeService->insertFinance($param);
			if ($insertFinanceResp->errCode != 0) {
				$resp->msg = '添加资金明细有误';
				return $resp;
			}
		}
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function setUserImg($userList) {
		if (!is_array($userList) || count($userList) <= 0) {
			return $userList;
		}
		$resourceIdArr = array();
		for ($i = 0, $length = count($userList); $i < $length; $i++) {
			$profileImg = trim($userList[$i]['profileImg']);
			$personalImg = trim($userList[$i]['personalImg']);
			$identityImg = trim($userList[$i]['identityImg']);
			$businessImg = trim($userList[$i]['businessImg']);
			$profileImg  = explode(',', $profileImg);
			$personalImg  = explode(',', $personalImg);
			$identityImg  = explode(',', $identityImg);
			$businessImg  = explode(',', $businessImg);
			foreach ($profileImg as $item) {
				if (is_numeric($item)) {
					$resourceIdArr[] = $item;
				}
			}
			foreach ($personalImg as $item) {
				if (is_numeric($item)) {
					$resourceIdArr[] = $item;
				}
			}
			foreach ($identityImg as $item) {
				if (is_numeric($item)) {
					$resourceIdArr[] = $item;
				}
			}
			foreach ($businessImg as $item) {
				if (is_numeric($item)) {
					$resourceIdArr[] = $item;
				}
			}
		}
		$resourceMap = array();
		if (count($resourceIdArr) > 0) {
			$param = array();
			$param['resourceId'] = $resourceIdArr;
			$param['pageNum'] = 1;
			$param['pageSize'] = 1000;
			$selectResourceResp = $this->resourceService->selectResource($param);
			if ($selectResourceResp->errCode == 0) {
				$resourceList = $selectResourceResp->data['list'];
				foreach ($resourceList as $resource) {
					$resourceId = (int)$resource['resourceId'];
					if ($resourceId > 0) {
						$resourceMap[$resourceId] = $resource;
					}
				}
			}
		}
		for ($i = 0, $length = count($userList); $i < $length; $i++) {
			$profileImg = trim($userList[$i]['profileImg']);
			$personalImg = trim($userList[$i]['personalImg']);
			$identityImg = trim($userList[$i]['identityImg']);
			$businessImg = trim($userList[$i]['businessImg']);
			$profileImg  = explode(',', $profileImg);
			$personalImg  = explode(',', $personalImg);
			$identityImg  = explode(',', $identityImg);
			$businessImg  = explode(',', $businessImg);
			$profileImgArr = array();
			$personalImgArr = array();
			$identityImgArr = array();
			$businessImgArr = array();
			foreach ($profileImg as $item) {
				if (is_numeric($item) && !empty($resourceMap[$item])) {
					$profileImgArr[] = $resourceMap[$item];
				}
			}
			foreach ($personalImg as $item) {
				if (is_numeric($item) && !empty($resourceMap[$item])) {
					$personalImgArr[] = $resourceMap[$item];
				}
			}
			foreach ($identityImg as $item) {
				if (is_numeric($item) && !empty($resourceMap[$item])) {
					$identityImgArr[] = $resourceMap[$item];
				}
			}
			foreach ($businessImg as $item) {
				if (is_numeric($item) && !empty($resourceMap[$item])) {
					$businessImgArr[] = $resourceMap[$item];
				}
			}
			if (count($profileImgArr) > 0) {
				$userList[$i]['profileImg'] = $profileImgArr;
			}
			if (count($personalImgArr) > 0) {
				$userList[$i]['personalImg'] = $personalImgArr;
			}
			if (count($identityImgArr) > 0) {
				$userList[$i]['identityImg'] = $identityImgArr;
			}
			if (count($businessImgArr) > 0) {
				$userList[$i]['businessImg'] = $businessImgArr;
			}
		}
		return $userList;
	}
	
	public function setUserPlanCount($objectList, $key = 'userId') {	
		if (!is_array($objectList) || count($objectList) <= 0) {
			return $objectList;
		}
		$userIdArr = array();
		foreach ($objectList as $object) {
			$userId = (int)$object[$key];
			if ($userId > 0) {
				$userIdArr[] = $userId;
			}
		}
		$param = array();
		$param['userId'] = $userIdArr;
		$param['publish'] = 1;
		$param['planStatus'] = 1;//方案状态：1=未结束, 2=已结束
		$param['pageNum'] = 1;
		$param['pageSize'] = 10000;
		$selectPlanResp = $this->planService->selectPlan($param);
		$planList = $selectPlanResp->data['list'];
		$planMap = array();
		foreach ($planList as $plan) {
			$userId = (int)$plan['userId'];
			if(empty($planMap[$userId])){
				$planMap[$userId] = 0;
			}
			$planMap[$userId]++;
		}
		for ($i = 0, $length = count($objectList); $i < $length; $i++) {
			$userId = (int)$objectList[$i][$key];
			$objectList[$i]['planCount'] = $planMap[$userId];
		}
		return $objectList;
	}

	public function setUserRedDot($curUserId, $objectList, $key = 'userId') {
		$curUserId = (int)$curUserId;
		if ($curUserId <= 0 || !is_array($objectList) || count($objectList) <= 0) {
			return $objectList;
		}
		$userIdArr = array();
		foreach ($objectList as $object) {
			$userId = (int)$object[$key];
			if ($userId > 0) {
				$userIdArr[] = $userId;
			}
		}
		$param = array();
		$param['userId'] = $userIdArr;
		$param['publish'] = 1;
		$param['planStatus'] = 1;//方案状态：1=未结束, 2=已结束
		$selectPlanResp = $this->planService->selectPlan($param);
		$planList = $selectPlanResp->data['list'];
		$planMap = array();
		foreach ($planList as $plan) {
			$planId = (int)$plan['planId'];
			$userId = (int)$plan['userId'];
			if(empty($planMap[$userId])){
				$planMap[$userId] = array();
			}
			$planMap[$userId][] = $planId;
		}
		$param = array();
		$param['userId'] = $curUserId;
		$param['focusUserId'] = $userIdArr;
		$selectFocusResp = $this->focusService->selectFocus($param);
		$focusList = $selectFocusResp->data['list'];
		$focusMap = array();
		foreach ($focusList as $focus) {
			$focusUserId = (int)$focus['focusUserId'];
			$focusUserRecentPlanId = trim($focus['focusUserRecentPlanId']);
			$focusMap[$focusUserId] = explode(',', $focusUserRecentPlanId);
		}
		for ($i = 0, $length = count($objectList); $i < $length; $i++) {
			$userId = (int)$objectList[$i][$key];
			$planId = $planMap[$userId];
			$focusUserRecentPlanId = (array)$focusMap[$userId];
			$redDot = false;
			if ($userId != $curUserId && is_array($planId) && count($planId) > 0) {
				$redDot = count(array_diff($planId, $focusUserRecentPlanId)) > 0;
			}
			$objectList[$i]['redDot'] = $redDot;
		}
		return $objectList;
	}

	public function checkNeedBuyCombo($userId, $comboType) {
		$resp = requireModule('Resp');
		$userId = (int)$userId;
		$comboType = (int)$comboType;//套餐类型, 1=极限追盘, 2=晒米冷热(待定)
		if ($userId <= 0) {
			$resp->msg = 'userId有误';
			return $resp;
		}
		if ($comboType <= 0) {
			$resp->msg = 'comboType有误';
			return $resp;
		}
		//极限追盘目前免费
		if ($comboType == 1) {
			$resp->errCode = 3;
			$resp->msg = "套餐目前还有效，无需重复购买";
			return $resp;
		}
		/********************* 检查用户是否购买过套餐(代码开始) *********************/
		$param['comboType'] = $comboType;
		$param['publish'] = 1;
		$selectComboResp = $this->comboService->selectCombo($param);
		if ($selectComboResp->errCode != 0) {
			$resp->msg = "套餐查询有误";
			return $resp;
		}
		$selectComboData = $selectComboResp->data;
		if (empty($selectComboData) || empty($selectComboData['list']) || count($selectComboData['list']) <= 0) {
			$resp->msg = "套餐查询有误";
			return $resp;
		}
		$comboList = $selectComboData['list'];
		$comboIdArr = array();
		$comboMap = array();
		foreach ($comboList as $combo) {
			$id = (int)$combo['comboId'];
			if ($id > 0) {
				$comboIdArr[] = $id;
				$comboMap[$id] = $combo;
			}
		}
		$param = array();
		$param['orderType'] = 2;//订单类型, 0=方案订单, 1=充值订单, 2=套餐订单
		$param['userId'] = $userId;
		$param['comboId'] = $comboIdArr;
		$param['status'] = 2;
		$selectOrderResp = $this->orderService->selectOrder($param);
		if ($selectOrderResp->errCode != 0) {
			$resp->msg = "访问异常";
			return $resp;
		}
		$comboOrderList = $selectOrderResp->data['list'];
		if (count($comboOrderList) > 0) {
			foreach ($comboOrderList as $order) {
				$orderComboId = (int)$order['comboId'];
				$orderCreateTime = trim($order['createTime']);
				if ($orderComboId <= 0 || empty($orderCreateTime) || empty($comboMap[$orderComboId])) {
					continue;
				}
				$orderCreateTime = strtotime($orderCreateTime);
				$spanTime = (int)$comboMap[$orderComboId]['spanTime'];
				//实际上几乎不会出现小于0
				if ($spanTime < 0) {
					$spanTime = 0;
				}
				$offsetTime = time() - $orderCreateTime;
				if ($spanTime == 0 || $spanTime > $offsetTime) {
					$resp->errCode = 3;
					$resp->msg = "套餐目前还有效，无需重复购买";
					return $resp;
				}
			}
		}
		/********************* 检查用户是否购买过套餐(代码结束) *********************/
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	public function isAllowBuyTicket($userId) {
        $userId = (int)$userId;
		if ($userId <= 0) {
			return false;
		}
        /*$groupId = 2;
        $selectGroupByIdResp = $this->groupService->selectGroupById($groupId);
        $groupData = (array)$selectGroupByIdResp->data;
        $relateId = trim($groupData['relateId']);
        if ($selectGroupByIdResp->errCode != 0 || empty($groupData) || empty($relateId)) {
            return false;
        }
        $relateIdArr = explode(',', $relateId);*/

        $relateIdArr = array();
        $database = requireModule('Database');
        $field = array();
        $field[] = 'discard=0';
        $field[] = 'financeType=1';
        $field[] = '(incomeAmount+chargeAmount)>0';
        $field = implode(' and ', $field);
        $column = 'financeId,financeType,userId,nickName,realName,cashConsumeSumAmount,chargeConsumeSumAmount,incomeConsumeSumAmount,couponConsumeSumAmount,consumeSumAmount,recommendIncomeSumAmount,spreadIncomeSumAmount,prizeIncomeSumAmount,divideIncomeSumAmount,incomeSumAmount,withdrawingSumAmount,withdrewSumAmount,withdrawSumAmount,userChargeSumAmount,platformChargeSumAmount,chargeSumAmount,chargeFreezeSumAmount,incomeFreezeSumAmount,chargeAmount,incomeAmount,dataVersion,createTime,lastTime';
        $sql = 'select '.$column.' from t_finance_extra where '.$field.' order by financeId desc ';
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            return false;
        }
        while($info = $database->get($result)){
            $uId = (int)$info['userId'];
            if ($uId > 0) {
                $relateIdArr[] = $uId;
            }
        }
        $database->free($result);
        $database->close();

		/*global $curEnv;
		if ($curEnv == 'dist') {
			$relateIdArr[] = 4206;//13800000000帐号也不可以看见跟单
		} else if ($curEnv == 'beta') {
			$relateIdArr[] = 1416;//13800000000帐号也不可以看见跟单
		}*/
        return in_array($userId, $relateIdArr);
    }

	//校验通过后排序号码
    public function verifyDigitalBetContent($lotteryId, $betContent) {
        $resp = requireModule('Resp');
		$lotteryId = trim($lotteryId);
		$betContent = trim($betContent);
		if (empty($lotteryId) || empty($betContent)) {
			$resp->msg = '参数异常';
			return $resp;
		}
		//彩种
		$selectLotteryByIdResp = $this->lotteryService->selectLotteryById($lotteryId);
		if ($selectLotteryByIdResp->errCode != 0) {
			$resp->msg = '彩种有误';
			return $resp;
		}
		$lotteryData = $selectLotteryByIdResp->data;
		$lotteryName = $lotteryData['lotteryName'];
		if (empty($lotteryData) || empty($lotteryName)) {
			$resp->msg = '彩种类型有误';
			return $resp;
		}
        if ($lotteryId == 'SSQ') {
            $betContent = explode(';', $betContent);
            if (count($betContent) < 1) {
                $resp->msg = '投注格式错误';
                return $resp;
            }
            $betContentArr = array();
            foreach ($betContent as $content) {
                $digital = explode('|', $content);
                $redDigital = explode(',', $digital[0]);
                $blueDigital = explode(',', $digital[1]);
				$redDigitalCount = count($redDigital);
				$blueDigitalCount = count($blueDigital);
				if (count(array_unique($redDigital)) != $redDigitalCount || count(array_unique($blueDigital)) != $blueDigitalCount) {
					$resp->msg = '双色球红球或蓝球存在重复的号码';
					return $resp;
				}
				if ($redDigitalCount < 6 || $blueDigitalCount < 1 || $redDigitalCount > 20 || $blueDigitalCount > 16) {
					$resp->msg = '双色球投注格式错误';
					return $resp;
				}
				foreach ($redDigital as $item) {
					$item = trim($item);
					if (!preg_match('/^\d{2}$/', $item) || $item < '01' || $item > '33') {
						$resp->msg = '双色球红球格式错误';
						return $resp;
					}
				}
				foreach ($blueDigital as $item) {
					$item = trim($item);
					if (!preg_match('/^\d{2}$/', $item) || $item < '01' || $item > '16') {
						$resp->msg = '双色球蓝球格式错误';
						return $resp;
					}
				}
				//号码排序
				sort($redDigital);
				sort($blueDigital);
				$betContentArr[] = implode(',', $redDigital) . '|' . implode(',', $blueDigital);
			}
			$betContent = implode(';', $betContentArr);
        } else if ($lotteryId == 'JSK3') {
			$betContent = explode(';', $betContent);
			if (count($betContent) < 1) {
				$resp->msg = '投注格式错误';
				return $resp;
			}
			$betType = $lotteryData['betType'];
			if (empty($betType)) {
				$resp->msg = '玩法错误';
				return $resp;
			}
			$betContentArr = array();
			foreach ($betContent as $content) {
				$digital = explode(':', $content);
				$type = trim($digital[0]);
				$value = trim($digital[1]);
				if (!key_exists($type, $betType)) {
					$resp->msg = '不支持该玩法';
					return $resp;
				}
				if ($type == '2TDX') {//二同号单选：2TDX:11,22,33,44#5,6
					$tempArr = explode('#', $value);
					$leftArr = explode(',', trim($tempArr[0]));
					$rightArr = explode(',', trim($tempArr[1]));
					if (!is_array($tempArr) || count($tempArr) != 2 || !is_array($leftArr) || count($leftArr) <= 0 || !is_array($rightArr) || count($rightArr) <= 0) {
						$resp->msg = '二同号单选格式错误';
						return $resp;
					}
					$leftLength = count($leftArr);
					$rightLength = count($rightArr);
					$leftArr = array_unique($leftArr);
					$rightArr = array_unique($rightArr);
					if ($leftLength != count($leftArr) || $rightLength != count($rightArr)) {
						$resp->msg = '二同号单选不允许存在相同号码';
						return $resp;
					}
					$leftMap = array();
					foreach ($leftArr as $item) {
						$item = trim($item);
						if (!preg_match('/^([1-6])\1$/', $item)) {
							$resp->msg = '二同号单选左边格式错误';
							return $resp;
						}
						$leftMap[$item[0]] = true;
					}
					foreach ($rightArr as $item) {
						$item = trim($item);
						if (!preg_match('/^[1-6]$/', $item)) {
							$resp->msg = '二同号单选右边格式错误';
							return $resp;
						}
						if (key_exists($item, $leftMap)) {
							$resp->msg = '二同号单选左右两边不允许同号';
							return $resp;
						}
					}
					sort($leftArr);
					sort($rightArr);
					$betContentArr[] = $type . ':' . implode(',', $leftArr).'#'.implode(',', $rightArr);
				} else if ($type == '2TFX') {//二同号复选：2TFX:11*,22*,44*
					$tempArr = explode(',', $value);
					if (!is_array($tempArr) || count($tempArr) <= 0) {
						$resp->msg = '二同号复选格式错误';
						return $resp;
					}
					$tempLength = count($tempArr);
					$tempArr = array_unique($tempArr);
					if ($tempLength != count($tempArr)) {
						$resp->msg = '二同号复选不允许存在相同号码';
						return $resp;
					}
					foreach ($tempArr as $item) {
						$item = trim($item);
						if (!preg_match('/^([1-6])\1\*$/', $item)) {
							$resp->msg = '二同号复选格式错误';
							return $resp;
						}
					}
					sort($tempArr);
					$betContentArr[] = $type . ':' . implode(',', $tempArr);
				} else if ($type == '2BT') {//二不同号：2BT:1,2,3,4,5,6
					$tempArr = explode(',', $value);
					if (!is_array($tempArr) || count($tempArr) < 2) {
						$resp->msg = '二不同号格式错误';
						return $resp;
					}
					$tempLength = count($tempArr);
					$tempArr = array_unique($tempArr);
					if ($tempLength != count($tempArr)) {
						$resp->msg = '二不同号不允许存在相同号码';
						return $resp;
					}
					foreach ($tempArr as $item) {
						$item = trim($item);
						if (!preg_match('/^[1-6]$/', $item)) {
							$resp->msg = '二不同号格式错误';
							return $resp;
						}
					}
					sort($tempArr);
					$betContentArr[] = $type . ':' . implode(',', $tempArr);
				} else if ($type == '3TDX') {//三同号单选：3TDX:111,222,333,444
					$tempArr = explode(',', $value);
					if (!is_array($tempArr) || count($tempArr) <= 0) {
						$resp->msg = '三同号单选格式错误';
						return $resp;
					}
					$tempLength = count($tempArr);
					$tempArr = array_unique($tempArr);
					if ($tempLength != count($tempArr)) {
						$resp->msg = '三同号单选不允许存在相同号码';
						return $resp;
					}
					foreach ($tempArr as $item) {
						$item = trim($item);
						if (!preg_match('/^([1-6])\1{2}$/', $item)) {
							$resp->msg = '三同号单选格式错误';
							return $resp;
						}
					}
					sort($tempArr);
					$betContentArr[] = $type . ':' . implode(',', $tempArr);
				} else if ($type == '3TTX') {//三同号通选：3TTX:777
					if ($value != '777') {
						$resp->msg = '三同号通选格式错误';
						return $resp;
					}
					$betContentArr[] = $type . ':' . $value;
				} else if ($type == '3LTX') {//三连号通选：3LTX:789
					if ($value != '789') {
						$resp->msg = '三连号通选格式错误';
						return $resp;
					}
					$betContentArr[] = $type . ':' . $value;
				} else if ($type == '3BT') {//三不同号：3BT:1,2,3,4,5,6
					$tempArr = explode(',', $value);
					if (!is_array($tempArr) || count($tempArr) < 3) {
						$resp->msg = '三不同号格式错误';
						return $resp;
					}
					$tempLength = count($tempArr);
					$tempArr = array_unique($tempArr);
					if ($tempLength != count($tempArr)) {
						$resp->msg = '三不同号不允许存在相同号码';
						return $resp;
					}
					foreach ($tempArr as $item) {
						$item = trim($item);
						if (!preg_match('/^[1-6]$/', $item)) {
							$resp->msg = '三不同号格式错误';
							return $resp;
						}
					}
					sort($tempArr);
					$betContentArr[] = $type . ':' . implode(',', $tempArr);
				} else if ($type == 'HZ') {//和值：HZ:3,4,5,6,18
					$tempArr = explode(',', $value);
					if (!is_array($tempArr) || count($tempArr) <= 0) {
						$resp->msg = '和值格式错误';
						return $resp;
					}
					$tempLength = count($tempArr);
					$tempArr = array_unique($tempArr);
					if ($tempLength != count($tempArr)) {
						$resp->msg = '和值不允许存在相同号码';
						return $resp;
					}
					foreach ($tempArr as $item) {
						$item = (int)$item;
						if ($item < 3 || $item > 18) {
							$resp->msg = '和值格式错误';
							return $resp;
						}
					}
					sort($tempArr);
					$betContentArr[] = $type . ':' . implode(',', $tempArr);
				} else if ($type == 'DRAW') {//开奖：DRAW:1,2,3
					$tempArr = explode(',', $value);
					if (!is_array($tempArr) || count($tempArr) != 3) {
						$resp->msg = '开奖格式错误';
						return $resp;
					}
					foreach ($tempArr as $item) {
						$item = trim($item);
						if (!preg_match('/^[1-6]$/', $item)) {
							$resp->msg = '开奖格式错误';
							return $resp;
						}
					}
					sort($tempArr);
					$betContentArr[] = $type . ':' . implode(',', $tempArr);
				}
			}
			$betContent = implode(';', $betContentArr);
		} else if ($lotteryId == 'DLT') {
            $betContent = explode(';', $betContent);
            if (count($betContent) < 1) {
                $resp->msg = '投注格式错误';
                return $resp;
            }
            $betContentArr = array();
            foreach ($betContent as $content) {
                $digital = explode('+', $content);
                $redDigital = explode(',', $digital[0]);
                $blueDigital = explode(',', $digital[1]);
                $redDigitalCount = count($redDigital);
                $blueDigitalCount = count($blueDigital);
                if (count(array_unique($redDigital)) != $redDigitalCount || count(array_unique($blueDigital)) != $blueDigitalCount) {
                    $resp->msg = '大乐透红球或蓝球存在重复的号码';
                    return $resp;
                }
                if ($redDigitalCount < 5 || $blueDigitalCount < 2 || $redDigitalCount > 18 || $blueDigitalCount > 12) {
                    $resp->msg = '大乐透投注格式错误';
                    return $resp;
                }
                foreach ($redDigital as $item) {
                    $item = trim($item);
                    if (!preg_match('/^\d{2}$/', $item) || $item < '01' || $item > '35') {
                        $resp->msg = '大乐透红球格式错误';
                        return $resp;
                    }
                }
                foreach ($blueDigital as $item) {
                    $item = trim($item);
                    if (!preg_match('/^\d{2}$/', $item) || $item < '01' || $item > '12') {
                        $resp->msg = '大乐透蓝球格式错误';
                        return $resp;
                    }
                }
                //号码排序
                sort($redDigital);
                sort($blueDigital);
                $betContentArr[] = implode(',', $redDigital) . '+' . implode(',', $blueDigital);
            }
            $betContent = implode(';', $betContentArr);
        } else if ($lotteryId == 'GX11X5') {
            $betContent = explode(';', $betContent);
            if (count($betContent) < 1) {
                $resp->msg = '投注格式错误';
                return $resp;
            }
            $betType = $lotteryData['betType'];
            if (empty($betType)) {
                $resp->msg = '玩法错误';
                return $resp;
            }
            $betContentArr = array();
            foreach ($betContent as $content) {
                $digital = explode(':', $content);
                $type = trim($digital[0]);
                $value = trim($digital[1]);
                if (!key_exists($type, $betType)) {
                    $resp->msg = '广西11选5不支持该玩法';
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
				$tempArr = preg_split('/\||,/', $value);
				$tempLength = count($tempArr);
				if (!is_array($tempArr) || $tempLength <= 0 || $tempLength > 11) {
					$resp->msg = '广西11选5投注格式错误';
					return $resp;
				}
				$tempArr = array_unique($tempArr);
				if ($tempLength != count($tempArr)) {
					$resp->msg = '广西11选5 "'.$type.'" 不允许存在相同号码';
					return $resp;
				}
				foreach ($tempArr as $item) {
                    if (!preg_match('/^\d{2}$/', $item) || $item < '01' || $item > '11') {
						$resp->msg = '广西11选5号码范围错误';
						return $resp;
					}
				}
				$partArr = explode('|', $value);
				$partLength = count($partArr);
				if (!is_array($partArr) || $partLength <= 0) {
					$resp->msg = '广西11选5投注格式错误';
					return $resp;
				}
				if ((preg_match('/^RX([2-8])$/', $type, $mcArr) || preg_match('/^Q(1)$/', $type, $mcArr) || preg_match('/^Q([2-3])ZUX$/', $type, $mcArr)) && is_array($mcArr) && count($mcArr) == 2) {
					//RX[2-8] + Q1 + Q2ZUX + Q3ZUX
					if ($partLength != 1) {
						$resp->msg = '广西11选5 "'.$type.'" 格式错误';
						return $resp;
					}
					$num = (int)$mcArr[1];
					$tempArr = explode(',', $partArr[0]);
					if (count($tempArr) < $num) {
						$resp->msg = '广西11选5 "'.$type.'" 号码数量错误';
						return $resp;
					}
					sort($tempArr);
					$betContentArr[] = $type . ':' . implode(',', $tempArr);
				} else if (preg_match('/^Q([2-3])ZHX$/', $type, $mcArr) && is_array($mcArr) && count($mcArr) == 2) {
					$num = (int)$mcArr[1];
					if ($partLength != $num) {
						$resp->msg = '广西11选5 "'.$type.'" 格式错误';
						return $resp;
					}
					$btArr = array();
					foreach ($partArr as $part) {
						$tempArr = explode(',', $part);
						if (count($tempArr) < 1) {
							$resp->msg = '广西11选5 "'.$type.'" 格式错误';
							return $resp;
						}
						sort($tempArr);
						$btArr[] = implode(',', $tempArr);
					}
					if (count($btArr) <= 0) {
						$resp->msg = '广西11选5 "'.$type.'" 格式错误';
						return $resp;
					}
					$betContentArr[] = $type . ':' . implode('|', $btArr);
				} else if ($type == 'DRAW') {//开奖：DRAW:02,04,06,08,10
					$tempArr = explode(',', $value);
					if (!is_array($tempArr) || count($tempArr) != 5) {
						$resp->msg = '开奖格式错误';
						return $resp;
					}
					foreach ($tempArr as $item) {
						$item = trim($item);
						if (!preg_match('/^\d{2}$/', $item) || $item < '01' || $item > '11') {
							$resp->msg = '开奖格式错误';
							return $resp;
						}
					}
					$betContentArr[] = $type . ':' . implode(',', $tempArr);
				}
            }
            $betContent = implode(';', $betContentArr);
        } else if ($lotteryId == 'FC3D') {
			$betContent = explode(';', $betContent);
			if (count($betContent) < 1) {
				$resp->msg = '投注格式错误';
				return $resp;
			}
			$betType = $lotteryData['betType'];
			if (empty($betType)) {
				$resp->msg = '玩法错误';
				return $resp;
			}
			$betContentArr = array();
			foreach ($betContent as $content) {
				$digital = explode(':', $content);
				$type = trim($digital[0]);
				$value = trim($digital[1]);
				if (!key_exists($type, $betType)) {
					$resp->msg = '福彩3D不支持该玩法';
					return $resp;
				}
				/*
					ZHX:0,1|1,2,3|4,5,6  //直选
					ZHXHZ:0,1,9,11,27     //直选和值
					ZU3:0,1,2,3,4        //组三
					ZU6:0,1,2,3,4,5,6    //组六
				*/
				$partArr = explode('|', $value);
				$partLength = count($partArr);
				if (!is_array($partArr) || $partLength <= 0) {
					$resp->msg = '福彩3D投注格式错误';
					return $resp;
				}
				if ($type == 'ZHX') {
					if ($partLength != 3) {
						$resp->msg = '福彩3D "'.$type.'" 格式错误';
						return $resp;
					}
					$btArr = array();
					foreach ($partArr as $item) {
						$tempArr = explode(',', $item);
						if (count($tempArr) < 1 || !preg_match('/^(?:\d,?)+$/', $item)) {
							$resp->msg = '福彩3D "'.$type.'" 格式错误';
							return $resp;
						}
						sort($tempArr);
						$btArr[] = implode(',', $tempArr);
					}
					if (count($btArr) <= 0) {
						$resp->msg = '福彩3D "'.$type.'" 格式错误';
						return $resp;
					}
					$betContentArr[] = $type . ':' . implode('|', $btArr);
				} else if ($type == 'ZHXHZ' || $type == 'ZU3' || $type == 'ZU6') {
					if ($partLength != 1) {
						$resp->msg = '福彩3D "'.$type.'" 格式错误';
						return $resp;
					}
					$tempArr = explode(',', $value);
					if (count($tempArr) < 1 || !preg_match('/^(?:\d+,?)+$/', $value)) {
						$resp->msg = '福彩3D "'.$type.'" 格式错误';
						return $resp;
					}
					sort($tempArr);
					$betContentArr[] = $type . ':' . implode(',', $tempArr);
				} else if ($type == 'DRAW') {//开奖：DRAW:7,4,4|9,8,1
					$tempArr = explode('|', $value);
					if (!is_array($tempArr) || count($tempArr) != 2) {
						$resp->msg = '开奖格式错误';
						return $resp;
					}
					if (!preg_match('/^\d,\d,\d$/', $tempArr[0]) || !preg_match('/^\d,\d,\d$/', $tempArr[1])) {
						$resp->msg = '开奖格式错误';
						return $resp;
					}
					$betContentArr[] = $type . ':' . implode('|', $tempArr);
				}
			}
			$betContent = implode(';', $betContentArr);
		} else {
			$resp->msg = '错误的彩种';
			return $resp;
		}
        $resp->data = $betContent;
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }

    public function calculateDigitalTicket($lotteryId, $betContent) {
        $resp = requireModule('Resp');
		$lotteryId = trim($lotteryId);
		$betContent = trim($betContent);
        if (empty($lotteryId) || empty($betContent)) {
            $resp->msg = '参数异常';
            return $resp;
        }
		//彩种
		$selectLotteryByIdResp = $this->lotteryService->selectLotteryById($lotteryId);
		if ($selectLotteryByIdResp->errCode != 0) {
			$resp->msg = '彩种有误';
			return $resp;
		}
		$lotteryData = $selectLotteryByIdResp->data;
		$lotteryName = $lotteryData['lotteryName'];
		if (empty($lotteryData) || empty($lotteryName)) {
			$resp->msg = '彩种类型有误';
			return $resp;
		}
		$verifyDigitalBetContentResp = $this->verifyDigitalBetContent($lotteryId, $betContent);
		if ($verifyDigitalBetContentResp->errCode != 0) {
			$resp->msg = $verifyDigitalBetContentResp->msg;
			return $resp;
		}
		$betContent = $verifyDigitalBetContentResp->data;
		$ticketArr = array();
        if ($lotteryId == 'SSQ') {
			$betContentArr = explode(';', $betContent);
			foreach ($betContentArr as $content) {
				$content = trim($content);
				$digital = explode('|', $content);
				$redDigital = explode(',', $digital[0]);
				$blueDigital = explode(',', $digital[1]);
				$redUnit = $this->common->ZH($redDigital, 6);
				$blueUnit = $this->common->ZH($blueDigital, 1);
				$ticketUnit = count($redUnit)*count($blueUnit);
				if (empty($content) || !is_array($digital) || count($digital) != 2 || count($redDigital) < 6 || count($blueDigital) < 1 || $ticketUnit <= 0) {
					$resp->msg = '双色球投注格式有误';
					return $resp;
				}
				$betContentItem = array();
				foreach ($redUnit as $red) {
					sort($red);//防止分组后排序错乱
					foreach ($blueUnit as $blue) {
						sort($blue);//防止分组后排序错乱
						$betContentItem[] = implode(',', $red) . '|' . implode(',', $blue);
					}
				}
				if ($ticketUnit != count($betContentItem)) {
					$resp->msg = $lotteryName.'投注注数有误';
					return $resp;
				}
				$betType = 'DS';
				if ($ticketUnit > 1) {
					$betType = 'FS';
				}
				$ticketArr[] = array('betType' => $betType, 'ticketUnit' => $ticketUnit, 'betContent' => $content, 'betContentItem' => $betContentItem);
			}
        } else if ($lotteryId == 'JSK3') {
			$betType = $lotteryData['betType'];
			if (empty($betType)) {
				$resp->msg = '玩法错误';
				return $resp;
			}
			$betContentArr = explode(';', $betContent);
			foreach ($betContentArr as $content) {
				$content = trim($content);
				$digital = explode(':', $content);
				$type = trim($digital[0]);
				$value = trim($digital[1]);
				if (empty($content)) {
					$resp->msg = '江苏快3投注格式有误';
					return $resp;
				}
				if (!key_exists($type, $betType)) {
					$resp->msg = '江苏快3不支持该玩法';
					return $resp;
				}
				$ticketUnit = 0;
				$betContentItem = array();
				if ($type == '2TDX') {//二同号单选：2TDX:11,22,33,44#5,6
					$tempArr = explode('#', $value);
					$leftArr = explode(',', trim($tempArr[0]));
					$rightArr = explode(',', trim($tempArr[1]));
					$leftLength = count($leftArr);
					$rightLength = count($rightArr);
					$ticketUnit = $leftLength*$rightLength;
					if (!is_array($tempArr) || count($tempArr) != 2 || count($leftLength) <= 0 || count($rightLength) <= 0 || $ticketUnit <= 0) {
						$resp->msg = '二同号单选投注格式有误';
						return $resp;
					}
					foreach ($leftArr as $left) {
						foreach ($rightArr as $right) {
							$betContentItem[] = $type . ':' . $left.'#'.$right;
						}
					}
				} else if ($type == '2TFX') {//二同号复选：2TFX:11*,22*,44*
					$tempArr = explode(',', $value);
					$ticketUnit = count($tempArr);
					if (!is_array($tempArr) || count($tempArr) <= 0 || count($ticketUnit) <= 0) {
						$resp->msg = '二同号复选投注格式有误';
						return $resp;
					}
					foreach ($tempArr as $item) {
						$betContentItem[] = $type . ':' . $item;
					}
				} else if ($type == '2BT') {//二不同号：2BT:1,2,3,4,5,6
					$tempArr = explode(',', $value);
					$zhArr = $this->common->ZH($tempArr, 2);
					$ticketUnit = count($zhArr);
					if (!is_array($tempArr) || count($tempArr) <= 0 || !is_array($zhArr) || count($zhArr) <= 0 || $ticketUnit <= 0) {
						$resp->msg = '二不同号投注格式有误';
						return $resp;
					}
					foreach ($zhArr as $item) {
						sort($item);//防止分组后排序错乱
						$betContentItem[] = $type . ':' . implode(',', $item);
					}
				} else if ($type == '3TDX') {//三同号单选：3TDX:111,222,333,444
					$tempArr = explode(',', $value);
					$ticketUnit = count($tempArr);
					if (!is_array($tempArr) || count($tempArr) <= 0 || $ticketUnit <= 0) {
						$resp->msg = '三同号单选投注格式有误';
						return $resp;
					}
					foreach ($tempArr as $item) {
						$betContentItem[] = $type . ':' . $item;
					}
				} else if ($type == '3TTX') {//三同号通选：3TTX:777
					$ticketUnit = 1;
					if ($value != '777' || $ticketUnit <= 0) {
						$resp->msg = '三同号通选投注格式有误';
						return $resp;
					}
					$betContentItem[] = $type . ':' . $value;
				} else if ($type == '3LTX') {//三连号通选：3LTX:789
					$ticketUnit = 1;
					if ($value != '789' || $ticketUnit <= 0) {
						$resp->msg = '三连号通选投注格式有误';
						return $resp;
					}
					$betContentItem[] = $type . ':' . $value;
				} else if ($type == '3BT') {//三不同号：3BT:1,2,3,4,5,6
					$tempArr = explode(',', $value);
					$zhArr = $this->common->ZH($tempArr, 3);
					$ticketUnit = count($zhArr);
					if (!is_array($tempArr) || count($tempArr) <= 0 || !is_array($zhArr) || count($zhArr) <= 0 || $ticketUnit <= 0) {
						$resp->msg = '三不同号投注格式有误';
						return $resp;
					}
					foreach ($zhArr as $item) {
						sort($item);//防止分组后排序错乱
						$betContentItem[] = $type . ':' . implode(',', $item);
					}
				} else if ($type == 'HZ') {//和值：HZ:3,4,5,6,18
					$tempArr = explode(',', $value);
					$ticketUnit = count($tempArr);
					if (!is_array($tempArr) || count($tempArr) <= 0 || $ticketUnit <= 0) {
						$resp->msg = '和值投注格式有误';
						return $resp;
					}
					foreach ($tempArr as $item) {
						$betContentItem[] = $type . ':' . $item;
					}
				} else if ($type == 'DRAW') {//开奖：DRAW:1,2,3
					$tempArr = explode(',', $value);
					$ticketUnit = 1;
					if (!is_array($tempArr) || count($tempArr) != 3 || $ticketUnit <= 0) {
						$resp->msg = '开奖格式有误';
						return $resp;
					}
					$betContentItem[] = $type . ':' . $value;
				}
				if ($ticketUnit != count($betContentItem)) {
					$resp->msg = $lotteryName.'投注注数有误';
					return $resp;
				}
				$ticketArr[] = array('betType' => $type, 'ticketUnit' => $ticketUnit, 'betContent' => $content, 'betContentItem' => $betContentItem);
			}
        } else if ($lotteryId == 'DLT') {
            $betContentArr = explode(';', $betContent);
            foreach ($betContentArr as $content) {
                $content = trim($content);
                $digital = explode('+', $content);
                $redDigital = explode(',', $digital[0]);
                $blueDigital = explode(',', $digital[1]);
                $redUnit = $this->common->ZH($redDigital, 5);
                $blueUnit = $this->common->ZH($blueDigital, 2);
                $ticketUnit = count($redUnit)*count($blueUnit);
                if (empty($content) || !is_array($digital) || count($digital) != 2 || count($redDigital) < 5 || count($blueDigital) < 2 || $ticketUnit <= 0) {
                    $resp->msg = '大乐透投注格式有误';
                    return $resp;
                }
                $betContentItem = array();
                foreach ($redUnit as $red) {
                    sort($red);//防止分组后排序错乱
                    foreach ($blueUnit as $blue) {
                        sort($blue);//防止分组后排序错乱
                        $betContentItem[] = implode(',', $red) . '+' . implode(',', $blue);
                    }
                }
                if ($ticketUnit != count($betContentItem)) {
					$resp->msg = $lotteryName.'投注注数有误';
                    return $resp;
                }
                $betType = 'DS';
                if ($ticketUnit > 1) {
                    $betType = 'FS';
                }
                $ticketArr[] = array('betType' => $betType, 'ticketUnit' => $ticketUnit, 'betContent' => $content, 'betContentItem' => $betContentItem);
            }
        } else if ($lotteryId == 'GX11X5') {
			$betType = $lotteryData['betType'];
			if (empty($betType)) {
				$resp->msg = '玩法错误';
				return $resp;
			}
			$betContentArr = explode(';', $betContent);
			foreach ($betContentArr as $content) {
				$content = trim($content);
				$digital = explode(':', $content);
				$type = trim($digital[0]);
				$value = trim($digital[1]);
				if (empty($content)) {
					$resp->msg = '广西11选5投注格式有误';
					return $resp;
				}
				if (!key_exists($type, $betType)) {
					$resp->msg = '广西11选5不支持该玩法';
					return $resp;
				}
                $ticketUnit = 0;
                $betContentItem = array();
				$partArr = explode('|', $value);
				$partLength = count($partArr);
				if (!is_array($partArr) || $partLength <= 0) {
					$resp->msg = '广西11选5投注格式错误';
					return $resp;
				}
				if ((preg_match('/^RX([2-8])$/', $type, $mcArr) || preg_match('/^Q(1)$/', $type, $mcArr) || preg_match('/^Q([2-3])ZUX$/', $type, $mcArr)) && is_array($mcArr) && count($mcArr) == 2) {
					//RX[2-8] + Q1 + Q2ZUX + Q3ZUX
					if ($partLength != 1) {
						$resp->msg = '广西11选5 "'.$type.'" 格式错误';
						return $resp;
					}
					$num = (int)$mcArr[1];
					$tempArr = explode(',', $partArr[0]);
					if (count($tempArr) < $num) {
						$resp->msg = '广西11选5 "'.$type.'" 号码数量错误';
						return $resp;
					}
					$zhArr = $this->common->ZH($tempArr, $num);
					$ticketUnit = count($zhArr);
					if ($ticketUnit <= 0) {
						$resp->msg = '广西11选5投注格式有误';
						return $resp;
					}
					foreach ($zhArr as $item) {
						sort($item);//防止分组排序错乱
						$betContentItem[] = $type . ':' . implode(',', $item);
					}
				} else if (preg_match('/^Q([2-3])ZHX$/', $type, $mcArr) && is_array($mcArr) && count($mcArr) == 2) {
					$num = (int)$mcArr[1];
					if ($partLength != $num) {
						$resp->msg = '广西11选5 "'.$type.'" 格式错误';
						return $resp;
					}
					if ($type == 'Q2ZHX') {
						$tempArr0 = explode(',', $partArr[0]);
						$tempArr1 = explode(',', $partArr[1]);
						$tempArr0Length = count($tempArr0);
						$tempArr1Length = count($tempArr1);
						if ($tempArr0Length < 1 || $tempArr1Length < 1) {
							$resp->msg = '广西11选5 "'.$type.'" 号码数量错误';
							return $resp;
						}
						$ticketUnit = $tempArr0Length * $tempArr1Length;
						for ($i0 = 0; $i0 < $tempArr0Length; $i0++) {
							for ($i1 = 0; $i1 < $tempArr1Length; $i1++) {
								$betContentItem[] = $type . ':' . $tempArr0[$i0] . '|' . $tempArr1[$i1];
							}
						}
					} else if ($type == 'Q3ZHX') {
						$tempArr0 = explode(',', $partArr[0]);
						$tempArr1 = explode(',', $partArr[1]);
						$tempArr2 = explode(',', $partArr[2]);
						$tempArr0Length = count($tempArr0);
						$tempArr1Length = count($tempArr1);
						$tempArr2Length = count($tempArr2);
						if ($tempArr0Length < 1 || $tempArr1Length < 1 || $tempArr2Length < 1) {
							$resp->msg = '广西11选5 "'.$type.'" 号码数量错误';
							return $resp;
						}
						$ticketUnit = $tempArr0Length * $tempArr1Length * $tempArr2Length;
						for ($i0 = 0; $i0 < $tempArr0Length; $i0++) {
							for ($i1 = 0; $i1 < $tempArr1Length; $i1++) {
								for ($i2 = 0; $i2 < $tempArr2Length; $i2++) {
									$betContentItem[] = $type . ':' . $tempArr0[$i0] . '|' . $tempArr1[$i1] . '|' . $tempArr2[$i2];
								}
							}
						}
					}
				} else if ($type == 'DRAW') {//开奖：DRAW:02,04,06,08,10
					$tempArr = explode(',', $value);
					$ticketUnit = 1;
					if (!is_array($tempArr) || count($tempArr) != 5 || $ticketUnit <= 0) {
						$resp->msg = '开奖格式有误';
						return $resp;
					}
					$betContentItem[] = $type . ':' . $value;
				}
				if ($ticketUnit != count($betContentItem)) {
					$resp->msg = $lotteryName.'投注注数有误';
					return $resp;
				}
                $ticketArr[] = array('betType' => $type, 'ticketUnit' => $ticketUnit, 'betContent' => $content, 'betContentItem' => $betContentItem);
            }
        } else if ($lotteryId == 'FC3D') {
			$betType = $lotteryData['betType'];
			if (empty($betType)) {
				$resp->msg = '玩法错误';
				return $resp;
			}
			$betContentArr = explode(';', $betContent);
			foreach ($betContentArr as $content) {
				$content = trim($content);
				$digital = explode(':', $content);
				$type = trim($digital[0]);
				$value = trim($digital[1]);
				if (empty($content)) {
					$resp->msg = '福彩3D投注格式有误';
					return $resp;
				}
				if (!key_exists($type, $betType)) {
					$resp->msg = '福彩3D不支持该玩法';
					return $resp;
				}
				$ticketUnit = 0;
				$betContentItem = array();
				$partArr = explode('|', $value);
				$partLength = count($partArr);
				if (!is_array($partArr) || $partLength <= 0) {
					$resp->msg = '福彩3D投注格式错误';
					return $resp;
				}
				if ($type == 'ZHX') {
					if ($partLength != 3) {
						$resp->msg = '福彩3D "'.$type.'" 格式错误';
						return $resp;
					}
					$tempArr0 = explode(',', $partArr[0]);
					$tempArr1 = explode(',', $partArr[1]);
					$tempArr2 = explode(',', $partArr[2]);
					$tempArr0Length = count($tempArr0);
					$tempArr1Length = count($tempArr1);
					$tempArr2Length = count($tempArr2);
					if ($tempArr0Length < 1 || $tempArr1Length < 1 || $tempArr2Length < 1) {
						$resp->msg = '福彩3D "'.$type.'" 号码数量错误';
						return $resp;
					}
					$ticketUnit = $tempArr0Length * $tempArr1Length * $tempArr2Length;
					for ($i0 = 0; $i0 < $tempArr0Length; $i0++) {
						for ($i1 = 0; $i1 < $tempArr1Length; $i1++) {
							for ($i2 = 0; $i2 < $tempArr2Length; $i2++) {
								$betContentItem[] = $type . ':' . $tempArr0[$i0] . '|' . $tempArr1[$i1] . '|' . $tempArr2[$i2];
							}
						}
					}
				} else if ($type == 'ZHXHZ' || $type == 'ZU3' || $type == 'ZU6') {
					if ($partLength != 1) {
						$resp->msg = '福彩3D "'.$type.'" 格式错误';
						return $resp;
					}
					$num = 0;
					if ($type == 'ZHXHZ') {
						$num = 1;
					} else if ($type == 'ZU3') {
						$num = 2;
					} else if ($type == 'ZU6') {
						$num = 3;
					}
					if ($num <= 0) {
						$resp->msg = '福彩3D "'.$type.'" 号码数量错误';
						return $resp;
					}
					$tempArr = explode(',', $partArr[0]);
					if (count($tempArr) < $num) {
						$resp->msg = '福彩3D "'.$type.'" 号码数量错误';
						return $resp;
					}
					$zhArr = $this->common->ZH($tempArr, $num);
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
					$ticketUnit = 0;
					foreach ($zhArr as $item) {
						if ($type == 'ZHXHZ') {
							$unit = (int)$ticketUnitMap[$item[0]];
							if (!key_exists($item[0], $ticketUnitMap) || $unit <= 0) {
								$resp->msg = '福彩3D和值倍数有误';
								return $resp;
							}
							$ticketUnit += $unit;
						} else if ($type == 'ZU3') {
							$ticketUnit += 2;
						} else {
							$ticketUnit++;
						}
						sort($item);//防止分组排序错乱
						$betContentItem[] = $type . ':' . implode(',', $item);
					}
					if ($ticketUnit <= 0) {
						$resp->msg = '福彩3D投注格式有误';
						return $resp;
					}
				} else if ($type == 'DRAW') {//开奖：DRAW:7,4,4|9,8,1
					$tempArr = explode('|', $value);
					if (!is_array($tempArr) || count($tempArr) != 2) {
						$resp->msg = '开奖格式错误';
						return $resp;
					}
					if (!preg_match('/^\d,\d,\d$/', $tempArr[0]) || !preg_match('/^\d,\d,\d$/', $tempArr[1])) {
						$resp->msg = '开奖格式错误';
						return $resp;
					}
					$ticketUnit = 1;
					$betContentItem[] = $type . ':' . implode('|', $tempArr);
				}
				if ($type == 'ZU3') {
					if ($ticketUnit != 2*count($betContentItem)) {
						$resp->msg = $lotteryName.'投注注数有误';
						return $resp;
					}
				} else if ($type != 'ZHXHZ') {
					if ($ticketUnit != count($betContentItem)) {
						$resp->msg = $lotteryName.'投注注数有误';
						return $resp;
					}
				}
				$ticketArr[] = array('betType' => $type, 'ticketUnit' => $ticketUnit, 'betContent' => $content, 'betContentItem' => $betContentItem);
			}
		} else {
			$resp->msg = '错误的彩种';
			return $resp;
		}
        $resp->data = $ticketArr;
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }

	public function calculateDigitalPrize($lotteryId, $betContent, $lotteryIssue, $append = 0) {
		$resp = requireModule('Resp');
		$lotteryId = trim($lotteryId);
		$betContent = trim($betContent);
		$drawNumber = trim($lotteryIssue['drawNumber']);
        $append = (int)$append;
		if (empty($lotteryId) || empty($betContent) || empty($lotteryIssue)) {
			$resp->msg = '参数异常';
			return $resp;
		}
		//彩种
		$selectLotteryByIdResp = $this->lotteryService->selectLotteryById($lotteryId);
		if ($selectLotteryByIdResp->errCode != 0) {
			$resp->msg = '彩种有误';
			return $resp;
		}
		$lotteryData = $selectLotteryByIdResp->data;
		$lotteryName = $lotteryData['lotteryName'];
		if (empty($lotteryData) || empty($lotteryName)) {
			$resp->msg = '彩种类型有误';
			return $resp;
		}
		$betCalculateDigitalTicketResp = $this->calculateDigitalTicket($lotteryId, $betContent);
		if ($betCalculateDigitalTicketResp->errCode != 0) {
			$resp->msg = 'betContent：'.$betCalculateDigitalTicketResp->msg;
			return $resp;
		}
		$betTicketArr = $betCalculateDigitalTicketResp->data;
		if (count($betTicketArr) <= 0) {
			$resp->msg = 'betContent格式异常';
			return $resp;
		}
		$prizeRet = array();
		if (empty($drawNumber)) {
			if ($lotteryId == 'SSQ') {
				foreach ($betTicketArr as $betTicket) {
					$betTicketUnit = (int)$betTicket['ticketUnit'];
					$betTicketBetContent = trim($betTicket['betContent']);
					$betTicketBetContentItem = $betTicket['betContentItem'];
					if ($betTicketUnit <= 0 || $betTicketUnit != count($betTicketBetContentItem)) {
						$resp->msg = 'betContent注数异常';
						return $resp;
					}
					$betDigital = explode('|', $betTicketBetContent);
					$betRed = explode(',', $betDigital[0]);
					$betBlue = explode(',', $betDigital[1]);
					$betRedMap = array();
					foreach ($betRed as $r) {
						$betRedMap[$r] = false;
					}
					$betBlueMap = array();
					foreach ($betBlue as $b) {
						$betBlueMap[$b] = false;
					}
					$ret = array();
					$ret['prizeStatus'] = 0;
					$ret['prizeName'] = '';
					$ret['prizeLevel'] = '';
					$ret['prizeAmount'] = 0;
					$ret['betContent'] = $betTicketBetContent;
					$ret['betContentResult'] = array('red' => $betRedMap, 'blue' => $betBlueMap);
					$ret['prizeResult'] = null;
					$prizeRet[] = $ret;
				}
			} else if ($lotteryId == 'JSK3') {
				$betType = $lotteryData['betType'];
				if (empty($betType)) {
					$resp->msg = '玩法错误';
					return $resp;
				}
				foreach ($betTicketArr as $betTicket) {
					$betTicketUnit = (int)$betTicket['ticketUnit'];
					$betTicketBetContent = trim($betTicket['betContent']);
					$betTicketBetContentItem = $betTicket['betContentItem'];
					if ($betTicketUnit <= 0 || $betTicketUnit != count($betTicketBetContentItem)) {
						$resp->msg = 'betContent注数异常';
						return $resp;
					}
					$digital = explode(':', $betTicketBetContent);
					$type = trim($digital[0]);
					$value = trim($digital[1]);//可能包括#,*
					$name = trim($betType[$type]);
					if (empty($type) || empty($value) || !key_exists($type, $betType) || empty($name)) {
						$resp->msg = 'betContent参数异常';
						return $resp;
					}
					$valueMap = array();
					if ($type == '3TTX' || $type == '3LTX') {
						$valueMap = array(array($name => false));
					} else {
						$valueMap = array(array($value => false));
					}
					$ret = array();
					$ret['prizeStatus'] = 0;
					$ret['prizeName'] = '';
					$ret['prizeLevel'] = '';
					$ret['prizeAmount'] = 0;
					$ret['betContent'] = $betTicketBetContent;
					$ret['betContentResult'] = array('name' => $name, 'type' => $type, 'value' => $valueMap);
					$ret['prizeResult'] = null;
					$prizeRet[] = $ret;
				}
			} else if ($lotteryId == 'DLT') {
                foreach ($betTicketArr as $betTicket) {
                    $betTicketUnit = (int)$betTicket['ticketUnit'];
                    $betTicketBetContent = trim($betTicket['betContent']);
                    $betTicketBetContentItem = $betTicket['betContentItem'];
                    if ($betTicketUnit <= 0 || $betTicketUnit != count($betTicketBetContentItem)) {
                        $resp->msg = 'betContent注数异常';
                        return $resp;
                    }
                    $betDigital = explode('+', $betTicketBetContent);
                    $betRed = explode(',', $betDigital[0]);
                    $betBlue = explode(',', $betDigital[1]);
                    $betRedMap = array();
                    foreach ($betRed as $r) {
                        $betRedMap[$r] = false;
                    }
                    $betBlueMap = array();
                    foreach ($betBlue as $b) {
                        $betBlueMap[$b] = false;
                    }
                    $ret = array();
                    $ret['prizeStatus'] = 0;
                    $ret['prizeName'] = '';
                    $ret['prizeLevel'] = '';
                    $ret['prizeAmount'] = 0;
                    $ret['betContent'] = $betTicketBetContent;
                    $ret['betContentResult'] = array('red' => $betRedMap, 'blue' => $betBlueMap);
                    $ret['prizeResult'] = null;
                    $prizeRet[] = $ret;
                }
            } else if ($lotteryId == 'GX11X5') {
                $betType = $lotteryData['betType'];
                if (empty($betType)) {
                    $resp->msg = '玩法错误';
                    return $resp;
                }
                foreach ($betTicketArr as $betTicket) {
                    $betTicketUnit = (int)$betTicket['ticketUnit'];
                    $betTicketBetContent = trim($betTicket['betContent']);
                    $betTicketBetContentItem = $betTicket['betContentItem'];
                    if ($betTicketUnit <= 0 || $betTicketUnit != count($betTicketBetContentItem)) {
                        $resp->msg = 'betContent注数异常';
                        return $resp;
                    }
                    $digital = explode(':', $betTicketBetContent);
                    $type = trim($digital[0]);
                    $value = trim($digital[1]);
                    $name = trim($betType[$type]);
                    if (empty($type) || empty($value) || !key_exists($type, $betType) || empty($name)) {
                        $resp->msg = 'betContent参数异常';
                        return $resp;
                    }
                    $valueMap = array(array($value => false));
                    $ret = array();
                    $ret['prizeStatus'] = 0;
                    $ret['prizeName'] = '';
                    $ret['prizeLevel'] = '';
                    $ret['prizeAmount'] = 0;
                    $ret['betContent'] = $betTicketBetContent;
                    $ret['betContentResult'] = array('name' => $name, 'type' => $type, 'value' => $valueMap);
                    $ret['prizeResult'] = null;
                    $prizeRet[] = $ret;
                }
            } else if ($lotteryId == 'FC3D') {
				$betType = $lotteryData['betType'];
				if (empty($betType)) {
					$resp->msg = '玩法错误';
					return $resp;
				}
				foreach ($betTicketArr as $betTicket) {
					$betTicketUnit = (int)$betTicket['ticketUnit'];
					$betTicketBetContent = trim($betTicket['betContent']);
					$betTicketBetContentItem = $betTicket['betContentItem'];
					if ($betTicketUnit <= 0) {
						$resp->msg = 'betContent注数异常';
						return $resp;
					}
					$digital = explode(':', $betTicketBetContent);
					$type = trim($digital[0]);
					$value = trim($digital[1]);
					$name = trim($betType[$type]);
					//不要校验empty($value)，因为福彩3D的"直选和值"可以是0
					if (empty($type) || !key_exists($type, $betType) || empty($name)) {
						$resp->msg = 'betContent参数异常';
						return $resp;
					}
					$valueMap = array(array($value => false));
					$ret = array();
					$ret['prizeStatus'] = 0;
					$ret['prizeName'] = '';
					$ret['prizeLevel'] = '';
					$ret['prizeAmount'] = 0;
					$ret['betContent'] = $betTicketBetContent;
					$ret['betContentResult'] = array('name' => $name, 'type' => $type, 'value' => $valueMap);
					$ret['prizeResult'] = null;
					$prizeRet[] = $ret;
				}
			}
			$resp->data = $prizeRet;
			$resp->errCode = 0;
			$resp->msg = '成功';
			return $resp;
		}
		if ($lotteryId == 'JSK3' || $lotteryId == 'GX11X5' || $lotteryId == 'FC3D') {
			$drawCalculateDigitalTicketResp = $this->calculateDigitalTicket($lotteryId, 'DRAW:'.$drawNumber);
		} else {
			$drawCalculateDigitalTicketResp = $this->calculateDigitalTicket($lotteryId, $drawNumber);
		}
		if ($drawCalculateDigitalTicketResp->errCode != 0) {
			$resp->msg = 'drawNumber：'.$drawCalculateDigitalTicketResp->msg;
			return $resp;
		}
		$drawTicketArr = $drawCalculateDigitalTicketResp->data;
		$drawTicketData = $drawTicketArr[0];
		$drawTicketUnit = (int)$drawTicketData['ticketUnit'];
		$drawTicketBetContent = trim($drawTicketData['betContent']);
		$drawTicketBetContentItem = $drawTicketData['betContentItem'];
		if (!is_array($drawTicketArr) || count($drawTicketArr) != 1 || $drawTicketUnit != 1 || empty($drawTicketBetContent) || count($drawTicketBetContentItem) != 1 || $drawTicketBetContent != $drawTicketBetContentItem[0]) {
			$resp->msg = 'drawNumber格式异常';
			return $resp;
		}
		if ($lotteryId == 'SSQ') {
			$drawDigital = explode('|', $drawNumber);
			$drawRed = explode(',', $drawDigital[0]);
			$drawBlue = explode(',', $drawDigital[1]);
			if (count($drawDigital) != 2 || count($drawRed) != 6 || count($drawBlue) != 1) {
				$resp->msg = 'betContent参数异常';
				return $resp;
			}
			$prizeMap = $this->lotteryService->getSSQPrizeMap();
			if (empty($prizeMap)) {
				$resp->msg = '双色球中奖映射异常';
				return $resp;
			}
			foreach ($betTicketArr as $betTicket) {
				$betTicketUnit = (int)$betTicket['ticketUnit'];
				$betTicketBetContent = trim($betTicket['betContent']);
				$betTicketBetContentItem = $betTicket['betContentItem'];
				if ($betTicketUnit <= 0 || $betTicketUnit != count($betTicketBetContentItem)) {
					$resp->msg = 'betContent注数异常';
					return $resp;
				}
				$prizeResult = array();
				foreach ($betTicketBetContentItem as $content) {
					$betDigital = explode('|', $content);
					$betRed = explode(',', $betDigital[0]);
					$betBlue = explode(',', $betDigital[1]);
					if (count($betDigital) != 2 || count($betRed) != 6 || count($betBlue) != 1) {
						$resp->msg = 'betContent参数异常';
						return $resp;
					}
					$betRedMap = array();
					foreach ($betRed as $r) {
						$betRedMap[$r] = false;
					}
					$betBlueMap = array();
					foreach ($betBlue as $b) {
						$betBlueMap[$b] = false;
					}
					foreach ($drawRed as $r) {
						if (key_exists($r, $betRedMap)) {
							$betRedMap[$r] = true;
						}
					}
					foreach ($drawBlue as $b) {
						if (key_exists($b, $betBlueMap)) {
							$betBlueMap[$b] = true;
						}
					}
					$redPrize = array_intersect($betRed, $drawRed);
					$bluePrize = array_intersect($betBlue, $drawBlue);
					$redPrizeCount = count($redPrize);
					$bluePrizeCount = count($bluePrize);
					$prize = $prizeMap[$redPrizeCount.'+'.$bluePrizeCount];
					$prizeName = trim($prize['name']);
					$prizeLevel = trim($prize['level']);
					$prizeAmount = (int)$prize['amount'] * 100;//转换成分单位
					if (!empty($prize) && !empty($prizeName) && !empty($prizeLevel)) {
						if (!key_exists($prizeLevel, $prizeResult)) {
							$prizeResult[$prizeLevel] = array();
						}
						$prizeResult[$prizeLevel][] = array(
							'prizeName' => $prizeName,
							'prizeLevel' => $prizeLevel,
							'prizeAmount' => $prizeAmount,
							'betContent' => $content,
							'betContentResult' => array('red' => $betRedMap, 'blue' => $betBlueMap)
						);
					}
				}
				//按奖级从小到大排序
				ksort($prizeResult);
				$prizeStatus = 0;
				$prizeName = '';
				$prizeLevel = '';
				$prizeAmount = 0;
				$prizeResultCount = count($prizeResult);
				if ($prizeResultCount > 0) {
					$prizeStatus = 1;//中奖状态, 0=未开奖, 1=已中奖, 2=未中奖
					foreach ($prizeResult as $arr) {
						foreach ($arr as $item) {
							$name = trim($item['prizeName']);
							$level = trim($item['prizeLevel']);
							$amount = (int)$item['prizeAmount'];
							if (empty($prizeName)) {
								$prizeName = $name;
							}
							if (empty($prizeLevel)) {
								$prizeLevel = $level;
							}
							if ($level != '1' && $level != '2' && $amount > 0) {
								$prizeAmount += $amount;
							}
						}
					}
				} else {
					$prizeStatus = 2;
				}
				if ($prizeStatus == 1 && (empty($prizeLevel) || empty($prizeName))) {
					$resp->msg = '中奖匹配异常';
					return $resp;
				}
				$betDigital = explode('|', $betTicketBetContent);
				$betRed = explode(',', $betDigital[0]);
				$betBlue = explode(',', $betDigital[1]);
				$betRedMap = array();
				foreach ($betRed as $r) {
					$betRedMap[$r] = false;
				}
				$betBlueMap = array();
				foreach ($betBlue as $b) {
					$betBlueMap[$b] = false;
				}
				foreach ($drawRed as $r) {
					if (key_exists($r, $betRedMap)) {
						$betRedMap[$r] = true;
					}
				}
				foreach ($drawBlue as $b) {
					if (key_exists($b, $betBlueMap)) {
						$betBlueMap[$b] = true;
					}
				}
				$ret = array();
				$ret['prizeStatus'] = $prizeStatus;
				$ret['prizeName'] = $prizeName;
				$ret['prizeLevel'] = $prizeLevel;
				$ret['prizeAmount'] = $prizeAmount;
				$ret['betContent'] = $betTicketBetContent;
				$ret['betContentResult'] = array('red' => $betRedMap, 'blue' => $betBlueMap);
				$ret['prizeResult'] = $prizeResult;
				$prizeRet[] = $ret;
			}
		} else if ($lotteryId == 'JSK3') {
			$betType = $lotteryData['betType'];
			if (empty($betType)) {
				$resp->msg = '玩法错误';
				return $resp;
			}
			$drawNumberArr = explode(',', trim($drawNumber));
			if (!is_array($drawNumberArr) || count($drawNumberArr) != 3) {
				$resp->msg = '开奖格式异常';
				return $resp;
			}
			$getJSK3PrizeMapResp = $this->getJSK3PrizeMap($drawNumber);
			if ($getJSK3PrizeMapResp->errCode != 0) {
				$resp->msg = $getJSK3PrizeMapResp->msg;
				return $resp;
			}
			$prizeMap = $getJSK3PrizeMapResp->data;
			if (empty($prizeMap)) {
				$resp->msg = '江苏快3中奖映射异常';
				return $resp;
			}
			$drawNumberSum = 0;
			foreach ($drawNumberArr as $item) {
				$drawNumberSum += (int)$item;
			}
			foreach ($betTicketArr as $betTicket) {
				$betTicketUnit = (int)$betTicket['ticketUnit'];
				$betTicketBetContent = trim($betTicket['betContent']);
				$betTicketBetContentItem = $betTicket['betContentItem'];
				if ($betTicketUnit <= 0 || $betTicketUnit != count($betTicketBetContentItem)) {
					$resp->msg = 'betContent注数异常';
					return $resp;
				}
				$prizeResult = array();
				foreach ($betTicketBetContentItem as $content) {
					$digital = explode(':', $content);
					$type = trim($digital[0]);
					$value = trim($digital[1]);//可能包括#,*
					$name = trim($betType[$type]);
					if (empty($type) || empty($value) || !key_exists($type, $betType) || empty($name)) {
						$resp->msg = 'betContent参数异常';
						return $resp;
					}
					preg_match_all('/\d+\*?|,|#/', $value, $valueArr);
					if (!is_array($valueArr[0]) || count($valueArr[0]) <= 0) {
						$resp->msg = '投注格式异常';
						return $resp;
					}
					$valueMap = array();
					sort($valueArr[0], SORT_STRING);//排序
					$value = implode('', $valueArr[0]);
					$value = preg_replace("/\D/", "", $value);
					if ($type == '2TFX') {//二同号复选：2TFX:11*,22*,44*
						$value = $value.'*';
					}
					$prizeAmount = (int)$prizeMap[$type][$value] * 100;//转换成分单位
					if ($prizeAmount > 0) {
						//三同号通选：3TTX:777 和 三连号通选：3LTX:789 中奖高亮所有号码
						if ($type == '3TTX' || $type == '3LTX') {
							$valueMap = array(array($name => true));
						} else {
							$bingo = strpos(preg_replace("/\D/", "", $drawNumber), preg_replace("/\D/", "", $value));
							$valueMap = array(array($value => $bingo !== false));
						}
						$prizeResult[] = array(
							'prizeName' => '',
							'prizeLevel' => '',
							'prizeAmount' => $prizeAmount,
							'betContent' => $content,
							'betContentResult' => array('name' => $name, 'type' => $type, 'value' => $valueMap)
						);
					}
				}
				$prizeStatus = 0;
				$prizeAmount = 0;
				$prizeResultCount = count($prizeResult);
				if ($prizeResultCount > 0) {
					$prizeStatus = 1;//中奖状态, 0=未开奖, 1=已中奖, 2=未中奖
					foreach ($prizeResult as $item) {
						$prizeAmount += (int)$item['prizeAmount'];
					}
				} else {
					$prizeStatus = 2;
				}
				$bDigital = explode(':', $betTicketBetContent);
				$bType = trim($bDigital[0]);
				$bValue =  trim($bDigital[1]);//可能包括#,*
				$bName = trim($betType[$bType]);
				$bValueMap = array();
				if ($prizeAmount > 0) {
					//三同号通选：3TTX:777 和 三连号通选：3LTX:789 中奖高亮所有号码
					if ($bType == '3TTX' || $bType == '3LTX') {
						$bValueMap = array(array($bName => true));
					} else {
						preg_match_all('/\d+\*?|,|#/', $bValue, $bValueArr);
						if (!is_array($bValueArr[0]) || count($bValueArr[0]) <= 0) {
							$resp->msg = '投注格式异常';
							return $resp;
						}
						for ($i = 0, $length = count($bValueArr[0]); $i < $length; $i++) {
							$v = (string)trim($bValueArr[0][$i]);
							$temp = preg_replace("/\D/", "", $v);
							$bingo = false;
							if (!empty($temp)) {
								$bingo = strpos(preg_replace("/\D/", "", $drawNumber), $temp) !== false;
								if ($bType == 'HZ') {
									$bingo = ($temp == $drawNumberSum);
								}
							}
							$bValueMap[] = array($v => $bingo);
						}
					}
				} else {
					if ($bType == '3TTX' || $bType == '3LTX') {
						$bValueMap = array(array($bName => false));
					} else {
						$bValueMap = array(array($bValue => false));
					}
				}
				$ret = array();
				$ret['prizeName'] = '';
				$ret['prizeLevel'] = '';
				$ret['prizeStatus'] = $prizeStatus;
				$ret['prizeAmount'] = $prizeAmount;
				$ret['betContent'] = $betTicketBetContent;
				$ret['betContentResult'] = array('name' => $bName, 'type' => $bType, 'value' => $bValueMap);
				$ret['prizeResult'] = $prizeResult;
				$prizeRet[] = $ret;
			}
		} else if ($lotteryId == 'DLT') {
            $drawDigital = explode('+', $drawNumber);
            $drawRed = explode(',', $drawDigital[0]);
            $drawBlue = explode(',', $drawDigital[1]);
            if (count($drawDigital) != 2 || count($drawRed) != 5 || count($drawBlue) != 2) {
                $resp->msg = 'betContent参数异常';
                return $resp;
            }
            $prizeMap = $this->lotteryService->getDLTPrizeMap();
            if (empty($prizeMap)) {
                $resp->msg = '大乐透中奖映射异常';
                return $resp;
            }
            foreach ($betTicketArr as $betTicket) {
                $betTicketUnit = (int)$betTicket['ticketUnit'];
                $betTicketBetContent = trim($betTicket['betContent']);
                $betTicketBetContentItem = $betTicket['betContentItem'];
                if ($betTicketUnit <= 0 || $betTicketUnit != count($betTicketBetContentItem)) {
                    $resp->msg = 'betContent注数异常';
                    return $resp;
                }
                $prizeResult = array();
                foreach ($betTicketBetContentItem as $content) {
                    $betDigital = explode('+', $content);
                    $betRed = explode(',', $betDigital[0]);
                    $betBlue = explode(',', $betDigital[1]);
                    if (count($betDigital) != 2 || count($betRed) != 5 || count($betBlue) != 2) {
                        $resp->msg = 'betContent参数异常';
                        return $resp;
                    }
                    $betRedMap = array();
                    foreach ($betRed as $r) {
                        $betRedMap[$r] = false;
                    }
                    $betBlueMap = array();
                    foreach ($betBlue as $b) {
                        $betBlueMap[$b] = false;
                    }
                    foreach ($drawRed as $r) {
                        if (key_exists($r, $betRedMap)) {
                            $betRedMap[$r] = true;
                        }
                    }
                    foreach ($drawBlue as $b) {
                        if (key_exists($b, $betBlueMap)) {
                            $betBlueMap[$b] = true;
                        }
                    }
                    $redPrize = array_intersect($betRed, $drawRed);
                    $bluePrize = array_intersect($betBlue, $drawBlue);
                    $redPrizeCount = count($redPrize);
                    $bluePrizeCount = count($bluePrize);
                    $prize = $prizeMap[$append.'->'.$redPrizeCount.'+'.$bluePrizeCount];
                    $prizeName = trim($prize['name']);
                    $prizeLevel = trim($prize['level']);
                    $prizeAmount = (int)$prize['amount'] * 100;//转换成分单位
                    if (!empty($prize) && !empty($prizeName) && !empty($prizeLevel)) {
                        if (!key_exists($prizeLevel, $prizeResult)) {
                            $prizeResult[$prizeLevel] = array();
                        }
                        $prizeResult[$prizeLevel][] = array(
                            'prizeName' => $prizeName,
                            'prizeLevel' => $prizeLevel,
                            'prizeAmount' => $prizeAmount,
                            'betContent' => $content,
                            'betContentResult' => array('red' => $betRedMap, 'blue' => $betBlueMap)
                        );
                    }
                }
                //按奖级从小到大排序
                ksort($prizeResult);
                $prizeStatus = 0;
                $prizeName = '';
                $prizeLevel = '';
                $prizeAmount = 0;
                $prizeResultCount = count($prizeResult);
                if ($prizeResultCount > 0) {
                    $prizeStatus = 1;//中奖状态, 0=未开奖, 1=已中奖, 2=未中奖
                    foreach ($prizeResult as $arr) {
                        foreach ($arr as $item) {
                            $name = trim($item['prizeName']);
                            $level = trim($item['prizeLevel']);
                            $amount = (int)$item['prizeAmount'];
                            if (empty($prizeName)) {
                                $prizeName = $name;
                            }
                            if (empty($prizeLevel)) {
                                $prizeLevel = $level;
                            }
                            if ($level != '1' && $level != '2' && $level != '3' && $amount > 0) {
                                $prizeAmount += $amount;
                            }
                        }
                    }
                } else {
                    $prizeStatus = 2;
                }
                if ($prizeStatus == 1 && (empty($prizeLevel) || empty($prizeName))) {
                    $resp->msg = '中奖匹配异常';
                    return $resp;
                }
                $betDigital = explode('+', $betTicketBetContent);
                $betRed = explode(',', $betDigital[0]);
                $betBlue = explode(',', $betDigital[1]);
                $betRedMap = array();
                foreach ($betRed as $r) {
                    $betRedMap[$r] = false;
                }
                $betBlueMap = array();
                foreach ($betBlue as $b) {
                    $betBlueMap[$b] = false;
                }
                foreach ($drawRed as $r) {
                    if (key_exists($r, $betRedMap)) {
                        $betRedMap[$r] = true;
                    }
                }
                foreach ($drawBlue as $b) {
                    if (key_exists($b, $betBlueMap)) {
                        $betBlueMap[$b] = true;
                    }
                }
                $ret = array();
                $ret['prizeStatus'] = $prizeStatus;
                $ret['prizeName'] = $prizeName;
                $ret['prizeLevel'] = $prizeLevel;
                $ret['prizeAmount'] = $prizeAmount;
                $ret['betContent'] = $betTicketBetContent;
                $ret['betContentResult'] = array('red' => $betRedMap, 'blue' => $betBlueMap);
                $ret['prizeResult'] = $prizeResult;
                $prizeRet[] = $ret;
            }
        } else if ($lotteryId == 'GX11X5') {
            $betType = $lotteryData['betType'];
            if (empty($betType)) {
                $resp->msg = '玩法错误';
                return $resp;
            }
            $drawNumberArr = explode(',', trim($drawNumber));
            if (!is_array($drawNumberArr) || count($drawNumberArr) != 5) {
                $resp->msg = '开奖格式异常';
                return $resp;
            }
			$prizeMap = $this->lotteryService->getGX11X5PrizeMap();
			if (empty($prizeMap)) {
				$resp->msg = '广西11选5中奖映射异常';
				return $resp;
			}
            foreach ($betTicketArr as $betTicket) {
                $betTicketUnit = (int)$betTicket['ticketUnit'];
                $betTicketBetContent = trim($betTicket['betContent']);
                $betTicketBetContentItem = $betTicket['betContentItem'];
                if ($betTicketUnit <= 0 || $betTicketUnit != count($betTicketBetContentItem)) {
                    $resp->msg = 'betContent注数异常';
                    return $resp;
                }
                $prizeResult = array();
                foreach ($betTicketBetContentItem as $content) {
                    $digital = explode(':', $content);
                    $type = trim($digital[0]);
                    $value = trim($digital[1]);
                    $name = trim($betType[$type]);
					if (empty($type) || empty($value) || !key_exists($type, $betType) || empty($name)) {
						$resp->msg = 'betContent参数异常';
						return $resp;
					}
					preg_match_all('/\d+|,|\|/', $value, $valueArr);
					if (!is_array($valueArr[0]) || count($valueArr[0]) <= 0) {
						$resp->msg = '投注格式异常';
						return $resp;
					}
					//预先高亮包含的内容(不一定是中奖情况)
					$valueMap = array();
					foreach ($valueArr[0] as $item) {
						$valueMap[] = array($item => in_array($item, $drawNumberArr));
					}
					$vArr = preg_split('/,|\|/', $value);
					if (!is_array($vArr) || count($vArr) <= 0) {
						$resp->msg = '投注格式异常';
						return $resp;
					}
					$prizeAmount = 0;
					if (preg_match('/^RX([2-8])$/', $type, $mcArr) && is_array($mcArr) && count($mcArr) == 2) {
						$num = (int)$mcArr[1];
						$intersectNum = count(array_intersect($drawNumberArr, $vArr));
						//RX2-5时，$num和$intersectNum一致才算中奖；RX6-8时，$intersectNum等于5就算中奖；
						if ($intersectNum == $num || $intersectNum == 5) {
							$prizeAmount = (int)$prizeMap[$type] * 100;//转换成分单位
						}
					} else if ((preg_match('/^Q(1)$/', $type, $mcArr) || preg_match('/^Q([2-3])ZHX$/', $type, $mcArr)) && is_array($mcArr) && count($mcArr) == 2) {
						$num = (int)$mcArr[1];
						$tempValue = implode(',', $vArr);
						$tempDraw = implode(',', array_slice($drawNumberArr, 0, $num));//前面几个号码
						if ($tempValue == $tempDraw) {
							$prizeAmount = (int)$prizeMap[$type] * 100;//转换成分单位
						}
					} else if (preg_match('/^Q([2-3])ZUX$/', $type, $mcArr) && is_array($mcArr) && count($mcArr) == 2) {
						$num = (int)$mcArr[1];
						$tempDraw = array_slice($drawNumberArr, 0, $num);//前面几个号码
						$intersectNum = count(array_intersect($tempDraw, $vArr));
						if ($intersectNum == $num) {
							$prizeAmount = (int)$prizeMap[$type] * 100;//转换成分单位
						}
					}
                    if ($prizeAmount > 0) {
                        $prizeResult[] = array(
                            'prizeName' => '',
                            'prizeLevel' => '',
                            'prizeAmount' => $prizeAmount,
                            'betContent' => $content,
                            'betContentResult' => array('name' => $name, 'type' => $type, 'value' => $valueMap)
                        );
                    }
                }
				$prizeStatus = 0;
				$prizeAmount = 0;
				$prizeResultCount = count($prizeResult);
				if ($prizeResultCount > 0) {
					$prizeStatus = 1;//中奖状态, 0=未开奖, 1=已中奖, 2=未中奖
					foreach ($prizeResult as $item) {
						$prizeAmount += (int)$item['prizeAmount'];
					}
				} else {
					$prizeStatus = 2;
				}
				$bDigital = explode(':', $betTicketBetContent);
				$bType = trim($bDigital[0]);
				$bValue =  trim($bDigital[1]);
				$bName = trim($betType[$bType]);
				$bValueMap = array();
				preg_match_all('/\d+|,|\|/', $bValue, $bValueArr);
				if (!is_array($bValueArr[0]) || count($bValueArr[0]) <= 0) {
					$resp->msg = '投注格式异常';
					return $resp;
				}
				if (preg_match('/^RX([2-8])$/', $bType, $mcArr) && is_array($mcArr) && count($mcArr) == 2) {
					foreach ($bValueArr[0] as $item) {
						$bValueMap[] = array($item => in_array($item, $drawNumberArr));
					}
				} else if ((preg_match('/^Q(1)$/', $bType, $mcArr) || preg_match('/^Q([2-3])ZHX$/', $bType, $mcArr)) && is_array($mcArr) && count($mcArr) == 2) {
					$shuXian = 0;//竖线次数
					foreach ($bValueArr[0] as $item) {
						if ($item == '|') {
							$shuXian++;
						}
						$bValueMap[] = array($item => $item == $drawNumberArr[$shuXian]);
					}
				} else if (preg_match('/^Q([2-3])ZUX$/', $bType, $mcArr) && is_array($mcArr) && count($mcArr) == 2) {
					$num = (int)$mcArr[1];
					$tempDraw = array_slice($drawNumberArr, 0, $num);//前面几个号码
					foreach ($bValueArr[0] as $item) {
						$bValueMap[] = array($item => in_array($item, $tempDraw));
					}
				}
                $ret = array();
                $ret['prizeName'] = '';
                $ret['prizeLevel'] = '';
                $ret['prizeStatus'] = $prizeStatus;
                $ret['prizeAmount'] = $prizeAmount;
                $ret['betContent'] = $betTicketBetContent;
                $ret['betContentResult'] = array('name' => $bName, 'type' => $bType, 'value' => $bValueMap);
                $ret['prizeResult'] = $prizeResult;
                $prizeRet[] = $ret;
            }
        } else if ($lotteryId == 'FC3D') {
			$betType = $lotteryData['betType'];
			if (empty($betType)) {
				$resp->msg = '玩法错误';
				return $resp;
			}
			$drawNumberArr = explode('|', trim($drawNumber));
			if (!is_array($drawNumberArr) || count($drawNumberArr) != 2) {
				$resp->msg = '开奖格式异常';
				return $resp;
			}
			$kjNumberArr = explode(',', trim($drawNumberArr[0]));
			$sjNumberArr = explode(',', trim($drawNumberArr[1]));
			if (!is_array($kjNumberArr) || count($kjNumberArr) != 3 || !is_array($sjNumberArr) || count($sjNumberArr) != 3) {
				$resp->msg = '开奖格式异常';
				return $resp;
			}
			$sumDraw = array_sum($kjNumberArr);
			$prizeMap = $this->lotteryService->getFC3DPrizeMap();
			if (empty($prizeMap)) {
				$resp->msg = '福彩3D中奖映射异常';
				return $resp;
			}
			foreach ($betTicketArr as $betTicket) {
				$betTicketUnit = (int)$betTicket['ticketUnit'];
				$betTicketBetContent = trim($betTicket['betContent']);
				$betTicketBetContentItem = $betTicket['betContentItem'];
				if ($betTicketUnit <= 0) {
					$resp->msg = 'betContent注数异常';
					return $resp;
				}
				$prizeResult = array();
				foreach ($betTicketBetContentItem as $content) {
					$digital = explode(':', $content);
					$type = trim($digital[0]);
					$value = trim($digital[1]);
					$name = trim($betType[$type]);
					//不要校验empty($value)，因为福彩3D的"直选和值"可以是0
					if (empty($type) || !key_exists($type, $betType) || empty($name)) {
						$resp->msg = 'betContent参数异常';
						return $resp;
					}
					preg_match_all('/\d+|,|\|/', $value, $valueArr);
					if (!is_array($valueArr[0]) || count($valueArr[0]) <= 0) {
						$resp->msg = '投注格式异常';
						return $resp;
					}
					//预先高亮包含的内容(不一定是中奖情况)
					$valueMap = array();
					foreach ($valueArr[0] as $item) {
						$ob = new \stdClass();
						if ($type == 'ZHXHZ') {
							$ob->$item = $item == $sumDraw;
						} else {
							$ob->$item = in_array($item, $kjNumberArr);
						}
						$valueMap[] = $ob;
					}
					$vArr = preg_split('/,|\|/', $value);
					if (!is_array($vArr) || count($vArr) <= 0) {
						$resp->msg = '投注格式异常';
						return $resp;
					}
					$prizeAmount = 0;
					if ($type == 'ZHX') {
						$tempValue = implode(',', $vArr);
						$tempDraw = implode(',', $kjNumberArr);
						if ($tempValue == $tempDraw) {
							$prizeAmount = (int)$prizeMap[$type] * 100;//转换成分单位
						}
					} else if ($type == 'ZHXHZ') {
						if ($value == $sumDraw) {
							$prizeAmount = (int)$prizeMap[$type] * 100;//转换成分单位
						}
					} else if ($type == 'ZU3' || $type == 'ZU6') {
						$tempDraw = array_unique($kjNumberArr);
						sort($tempDraw);
						sort($vArr);
						$tempDraw = implode(',', $tempDraw);
						$tempValue = implode(',', $vArr);
						if ($tempValue == $tempDraw) {
							$prizeAmount = (int)$prizeMap[$type] * 100;//转换成分单位
						}
					}
					if ($prizeAmount > 0) {
						$prizeResult[] = array(
							'prizeName' => '',
							'prizeLevel' => '',
							'prizeAmount' => $prizeAmount,
							'betContent' => $content,
							'betContentResult' => array('name' => $name, 'type' => $type, 'value' => $valueMap)
						);
					}
				}
				$prizeStatus = 0;
				$prizeAmount = 0;
				$prizeResultCount = count($prizeResult);
				if ($prizeResultCount > 0) {
					$prizeStatus = 1;//中奖状态, 0=未开奖, 1=已中奖, 2=未中奖
					foreach ($prizeResult as $item) {
						$prizeAmount += (int)$item['prizeAmount'];
					}
				} else {
					$prizeStatus = 2;
				}
				$bDigital = explode(':', $betTicketBetContent);
				$bType = trim($bDigital[0]);
				$bValue =  trim($bDigital[1]);
				$bName = trim($betType[$bType]);
				$bValueMap = array();
				preg_match_all('/\d+|,|\|/', $bValue, $bValueArr);
				if (!is_array($bValueArr[0]) || count($bValueArr[0]) <= 0) {
					$resp->msg = '投注格式异常';
					return $resp;
				}
				if ($bType == 'ZHX') {
					$shuXian = 0;//竖线次数
					foreach ($bValueArr[0] as $item) {
						if ($item == '|') {
							$shuXian++;
						}
						$ob = new \stdClass();
						$ob->$item = $item == $kjNumberArr[$shuXian];
						$bValueMap[] = $ob;
					}
				} else if ($bType == 'ZHXHZ') {
					foreach ($bValueArr[0] as $item) {
						$ob = new \stdClass();
						$ob->$item = $item == $sumDraw;
						$bValueMap[] = $ob;
					}
				} else if ($bType == 'ZU3') {
					foreach ($bValueArr[0] as $item) {
						$ob = new \stdClass();
						$ob->$item = $prizeAmount > 0 && in_array($item, $kjNumberArr);
						$bValueMap[] = $ob;
					}
				} else if ($bType == 'ZU6') {
					foreach ($bValueArr[0] as $item) {
						$ob = new \stdClass();
						$ob->$item = in_array($item, $kjNumberArr);
						$bValueMap[] = $ob;
					}
				}
				$ret = array();
				$ret['prizeName'] = '';
				$ret['prizeLevel'] = '';
				$ret['prizeStatus'] = $prizeStatus;
				$ret['prizeAmount'] = $prizeAmount;
				$ret['betContent'] = $betTicketBetContent;
				$ret['betContentResult'] = array('name' => $bName, 'type' => $bType, 'value' => $bValueMap);
				$ret['prizeResult'] = $prizeResult;
				$prizeRet[] = $ret;
			}
		}
		$resp->data = $prizeRet;
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}


	public function getJSK3PrizeMap($drawNumber) {
		$resp = requireModule('Resp');
		$drawNumber = trim($drawNumber);
		$drawNumberArr = explode(',', $drawNumber);
		if (!is_array($drawNumberArr) || count($drawNumberArr) != 3) {
			$resp->msg = '开奖格式错误';
			return $resp;
		}
		foreach ($drawNumberArr as $item) {
			$item = trim($item);
			if (!preg_match('/^[1-6]$/', $item)) {
				$resp->msg = '开奖格式错误';
				return $resp;
			}
		}
		sort($drawNumberArr);
		$drawNumber = trim(implode('', $drawNumberArr));
		$prizeMap = array();
		$lotteryPrizeMap = $this->lotteryService->getJSK3PrizeMap();
		/*二同号单选：2TDX:11,22,33,44#5,6
		二同号复选：2TFX:11*,22*,44*
		二不同号：2BT:1,2,3,4,5,6
		三同号单选：3TDX:111,222,333,444
		三同号通选：3TTX:777
		三连号通选：3LTX:789
		三不同号：3BT:1,2,3,4,5,6
		和值：HZ:3,4,5,6,18*/
		foreach ($lotteryPrizeMap as $key => $value) {
			$key = trim($key);
			if (!key_exists($key, $prizeMap)) {
				$prizeMap[$key] = array();
			}
			if ($key == '2TDX' || $key == '3TDX' || $key == '3BT') {
				if (key_exists($drawNumber, $value)) {
					$prizeMap[$key][$drawNumber] = $value[$drawNumber];
				}
			} else if ($key == '2TFX') {
				preg_match('/([1-6])\1/', $drawNumber, $towSameArr);
				if (is_array($towSameArr) && count($towSameArr) == 2) {
					$item = trim($towSameArr[0]).'*';
					if (key_exists($item, $value)) {
						$prizeMap[$key][$item] = $value[$item];
					}
				}
			} else if ($key == '2BT') {
				$zhArr = $this->common->ZH($drawNumberArr, 2);
				$arr = array();
				foreach ($zhArr as $item) {
					sort($item);//防止分组排序错乱
					$itemStr = implode('', $item);
					if (!preg_match('/^([1-6])\1$/', $itemStr)) {//不需要两个号码相同的
						$arr[] = $itemStr;
					}
				}
				$arr = array_unique($arr);//去重
				foreach ($arr as $item) {
					$item = trim($item);
					if (key_exists($item, $value)) {
						$prizeMap[$key][$item] = $value[$item];
					}
				}
			} else if ($key == '3TTX') {
				if (preg_match('/^([1-6])\1{2}$/', $drawNumber)) {
					$prizeMap[$key]['777'] = $value['777'];
				}
			} else if ($key == '3LTX') {
				if ($drawNumber == '123' || $drawNumber == '234' || $drawNumber == '345' || $drawNumber == '456') {
					$prizeMap[$key]['789'] = $value['789'];
				}
			} else if ($key == 'HZ') {
				$sum = 0;
				foreach ($drawNumberArr as $item) {
					$sum += (int)$item;
				}
				$prizeMap[$key][$sum] = $value[$sum];
			}
		}
		$resp->data = $prizeMap;
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

    //给每个对象设置赠送订单信息
    public function setPresentOrder($objectList, $key = 'presentOrderId') {
        if (!is_array($objectList) || count($objectList) <= 0) {
            return $objectList;
        }
        $orderIdArr = array();
        foreach ($objectList as $object) {
            $orderId = (int)$object[$key];
            if ($orderId > 0) {
                $orderIdArr[] = $orderId;
            }
        }
        $orderList = array();
        if (count($orderIdArr) > 0) {
            $param = array();
            $param['orderId'] = $orderIdArr;
            $selectOrderResp = $this->orderService->selectOrder($param);
            if ($selectOrderResp->errCode == 0 && !empty($selectOrderResp->data['list'])) {
                $orderList = $selectOrderResp->data['list'];
            }
        }
        $orderMap = array();
        foreach ($orderList as $order) {
            $orderId = (int)$order['orderId'];
            if ($orderId > 0) {
                $orderMap[$orderId] = $order;
            }
        }
        for ($i = 0, $length = count($objectList); $i < $length; $i++) {
            $orderId = (int)$objectList[$i][$key];
            if (!empty($orderMap[$orderId])) {
                $objectList[$i]['presentOrder'] = $orderMap[$orderId];
            }
        }
        return $objectList;
    }

    //给没个冠亚军竞猜设置赔率相关信息
    public function setGuessList($objectList, $key = 'planMatchRecommend') {
        if (!is_array($objectList) || count($objectList) <= 0) {
            return $objectList;
        }
        $oddsIdArr = array();
        foreach ($objectList as $object) {
            $matchRecommend = json_decode($object[$key], true);
            if (!empty($matchRecommend) && is_array($matchRecommend)) {
                foreach ($matchRecommend as $mr) {
                    $oddsId = (int)$mr['oddsId'];
                    if ($oddsId > 0) {
                        $oddsIdArr[] = $oddsId;
                    }
                }
            }
        }
        $oddsIdArr = array_unique($oddsIdArr);
        $oddsMap = array();
        $param = array();
        $param['oddsId'] = $oddsIdArr;
        $selectGuessOddsResp = $this->matchService->selectGuessOdds($param);
        if ($selectGuessOddsResp->errCode == 0) {
            $list = $selectGuessOddsResp->data['list'];
            if (!empty($list)) {
                foreach ($list as $l) {
                    $oddsId = (int)$l['oddsId'];
                    if ($oddsId > 0) {
                        $oddsMap[$oddsId] = $l;
                    }
                }
            }
        }
        for ($j = 0, $len = count($objectList); $j < $len; $j++) {
            $matchRecommend = json_decode($objectList[$j][$key], true);
            if (!empty($matchRecommend) && is_array($matchRecommend)) {
                for ($i = 0, $length = count($matchRecommend); $i < $length; $i++) {
                    $oddsId = (int)$matchRecommend[$i]['oddsId'];
                    if (!empty($oddsMap[$oddsId])) {
                        $lotteryId = trim($oddsMap[$oddsId]['lotteryId']);
                        $odds = trim($oddsMap[$oddsId]['odds']);
                        $number = (int)$oddsMap[$oddsId]['number'];
                        $team = trim($oddsMap[$oddsId]['team']);
                        if (empty($matchRecommend[$i]['odds'])) {
                            $matchRecommend[$i]['odds'] = $odds;
                        }
                        $matchRecommend[$i]['lotteryId'] = $lotteryId;
                        $matchRecommend[$i]['number'] = $number;
                        $matchRecommend[$i]['team'] = $team;
                    }
                }
                $objectList[$j]['guessList'] = $matchRecommend;
            }
        }
        return $objectList;
    }

    //竞猜冠亚军算奖
    public function calculateGuessPrize($guessList) {
        $resp = requireModule('Resp');
        if (!is_array($guessList) || count($guessList) <= 0) {
            $resp->msg = '参数异常';
            return $resp;
        }
        $oddsIdArr = array();
        $lotteryIdArr = array();
        $guessMap = array();
        foreach ($guessList as $guess) {
            $oddsId = (int)$guess['oddsId'];
            $odds = trim($guess['odds']);
            $lotteryId = trim($guess['lotteryId']);
            if ($oddsId <= 0 || empty($odds) || empty($lotteryId)) {
                $resp->msg = '参数异常';
                return $resp;
            }
            $oddsIdArr[] = $oddsId;
            $lotteryIdArr[] = $lotteryId;
            $guessMap[$oddsId] = $guess;
        }
        $oddsIdArr = array_unique($oddsIdArr);
        $lotteryIdArr = array_unique($lotteryIdArr);
        if (count($oddsIdArr) != count($guessList) || count($guessMap) != count($guessList) || count($lotteryIdArr) != 1) {
            $resp->msg = '竞猜内容异常';
            return $resp;
        }
        $lotteryId = trim($lotteryIdArr[0]);
        //比赛结束之后需要填写中奖oddsId
        $SJBGJPrizeOddsId = 0;
        $SJBGYJPrizeOddsId = 0;
        $prizeStatus = 0; //中奖状态, 0=未开奖, 1=已中奖, 2=未中奖
        $prizeOddsId = 0;
        $prizeOdds = 1;
        if ($lotteryId == 'SJBGJ') {
            if ($SJBGJPrizeOddsId > 0) {
                if (in_array($SJBGJPrizeOddsId, $oddsIdArr)) {
                    $guess = $guessMap[$SJBGJPrizeOddsId];
                    $oddsId = (int)$guess['oddsId'];
                    $odds = trim($guess['odds']);
                    if (!empty($guess) && $oddsId > 0 && !empty($odds)) {
                        $prizeStatus = 1;
                        $prizeOddsId = $oddsId;
                        $prizeOdds = $odds;
                    }
                } else {
                    $prizeStatus = 2;
                }
            }
        } else if ($lotteryId == 'SJBGYJ') {
            if ($SJBGYJPrizeOddsId > 0) {
                if (in_array($SJBGYJPrizeOddsId, $oddsIdArr)) {
                    $guess = $guessMap[$SJBGYJPrizeOddsId];
                    $oddsId = (int)$guess['oddsId'];
                    $odds = trim($guess['odds']);
                    if (!empty($guess) && $oddsId > 0 && !empty($odds)) {
                        $prizeStatus = 1;
                        $prizeOddsId = $oddsId;
                        $prizeOdds = $odds;
                    }
                } else {
                    $prizeStatus = 2;
                }
            }
        }
        $data = array(
            'prizeStatus' => $prizeStatus,
            'prizeOddsId' => $prizeOddsId,
            'prizeOdds' => $prizeOdds
        );
        $resp->data = $data;
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }
}