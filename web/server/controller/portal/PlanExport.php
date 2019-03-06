<?php
namespace controller\portal;
use controller\Base;

class PlanExport extends Base {
	private $common;
	private $resp;
	private $jsonView;
	private $commonService;
	private $userService;
    private $planService;
    private $partner;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->resp = requireModule("Resp");
		$this->jsonView = requireView("Json");
		$this->commonService = requireService("Common");
		$this->userService = requireService("User");
        $this->planService = requireService("Plan");
        /*
            Hua：5397FC2-178C2AD
            Sam：53984E8-178C7D3
            冯玮：53987AD-178CA98
            苹果：5398234-178C51F
            兰一：539881B-178CB06
            谢锐：5397FC6-178C2B1
            巴菲特玩竞彩：539852A-178C815
            破足球：5397FBB-178C2A6
            198足球：539801A-178C305
            卢欢：53984E6-178C7D1
            彩易开盘团队：53980DA-178C3C5
            荐彩致富：53995DE-178D8C9
            张佳玮：539A135-178E420
            NBA彩神：53995D9-178D8C4
            赵通：5399B38-178DE23
            彩虹：53995DB-178D8C6
            Macaus：53A5B4C-1799E37
            新哥：5397FB8-178C2A3
            沈石明：5399702-178D9ED
            华秋鸣：5399DC4-178E0AF
            陈云飞：5399CF8-178DFE3
            竞彩老钱：5397FB2-178C29D
            赵四：53995DA-178D8C5
            Brian：53B006C-17A4357
        */
        /*
         *  腾讯体育：
            Hua：5397FC2-178C2AD
            Sam：53984E8-178C7D3
            冯玮：53987AD-178CA98
            必发操盘手：5398818-178CB03
            Macaus：53A5B4C-1799E37
            198足球：539801A-178C305
            实弹竞彩：53995DD-178D8C8
            苹果：5398234-178C51F
            兰一：539881B-178CB06
            谢锐：5397FC6-178C2B1
            新哥：5397FB8-178C2A3
            破足球：5397FBB-178C2A6
            竞彩老钱：5397FB2-178C29D
            赵四：53995DA-178D8C5
            卢欢：53984E6-178C7D1
            Bwin:53A5B4D-1799E38
            彩易开盘团队：53980DA-178C3C5
            彩虹：53995DB-178D8C6
            千里：53B02D0-17A45BB
            赵通：5399B38-178DE23

            Brian：53B006C-17A4357
            梁小燕：53984E7-178C7D2
            NBA彩神：53995D9-178D8C4
            张佳玮：539A135-178E420
            Willian：539A134-178E41F
            丹丹：53984E5-178C7D0
        */
        $partnerMap = array(
            /*'1' => array(
                'partnerId' => 1,
                'partnerName' => '唯彩会',
                'partnerKey' => '00333fa289648f9243acd9a5f19bcf7b',//md5(partnerId|partnerName);
                'userNoArr' => array(
                    '5397FC2-178C2AD',
                    '53984E8-178C7D3',
                    '53987AD-178CA98',
                    '5398234-178C51F',
                    '539881B-178CB06',
                    '5397FC6-178C2B1',
                    '539852A-178C815',
                    '5397FBB-178C2A6',
                    '539801A-178C305',
                    '53984E6-178C7D1',
                    '53980DA-178C3C5',
                    '53995DE-178D8C9',
                    '539A135-178E420',
                    '53995D9-178D8C4',
                    '5399B38-178DE23',
                    '53995DB-178D8C6',
                    '53A5B4C-1799E37',
                    '5397FB8-178C2A3',
                    '5399702-178D9ED',
                    '5399DC4-178E0AF',
                    '5399CF8-178DFE3',
                    '5397FB2-178C29D',
                    '53995DA-178D8C5',
                    '53B006C-17A4357'
                )
            ),*/
            '2' => array(
                'partnerId' => 2,
                'partnerName' => '腾讯体育',
                'partnerKey' => 'de0a3df8d53a3951fa2ac271a2c3ccee',//md5(partnerId|partnerName);
                'userNoArr' => array(
                    '5397FC2-178C2AD',
                    '53984E8-178C7D3',
                    '53987AD-178CA98',
                    '5398818-178CB03',
                    '53A5B4C-1799E37',
                    '539801A-178C305',
                    '53995DD-178D8C8',
                    '5398234-178C51F',
                    '539881B-178CB06',
                    '5397FC6-178C2B1',
                    '5397FB8-178C2A3',
                    '5397FBB-178C2A6',
                    '5397FB2-178C29D',
                    '53995DA-178D8C5',
                    '53984E6-178C7D1',
                    '53A5B4D-1799E38',
                    '53980DA-178C3C5',
                    '53995DB-178D8C6',
                    '53B02D0-17A45BB',
                    '5399B38-178DE23',
                    '53B006C-17A4357',
                    '53984E7-178C7D2',
                    '53995D9-178D8C4',
                    '539A135-178E420',
                    '539A134-178E41F',
                    '53984E5-178C7D0'
                )
            ),
        );
        $this->partner = $partnerMap[trim($_POST['partnerId'])];
        $this->tencentPartner = $partnerMap['2'];
	}

	public function salePlanList() {
        if (!$this->verifySign()) {
            $this->resp->msg = "验签失败";
            $this->jsonView->out($this->resp);
        }
        $userNo = trim($this->common->getParam("userNo", ''));
        if (empty($userNo)) {
            $this->resp->msg = "userNo参数有误";
            $this->jsonView->out($this->resp);
        }
        $userNoArr = $this->partner['userNoArr'];
        $noArr = $this->common->decodeNo($userNo);
        $userId = (int)$noArr['userId'];
        if (!is_array($userNoArr) || count($userNoArr) <= 0 || !in_array($userNo, $userNoArr) || $userId <= 0) {
            $this->resp->msg = "没有该专家的访问权限";
            $this->jsonView->out($this->resp);
        }
        $selectUserByIdResp = $this->userService->selectUserById($userId);
        if ($selectUserByIdResp->errCode != 0) {
            $this->resp->msg = "专家查询异常";
            $this->jsonView->out($this->resp);
        }
        $user = $selectUserByIdResp->data;
        if (empty($user)) {
            $this->resp->msg = "专家不存";
            $this->jsonView->out($this->resp);
        }
        $nickName = trim($user['nickName']);
        $realName = trim($user['realName']);
        $profileImg = trim($user['profileImg']);
        $personalImg = trim($user['personalImg']);
        $remark = trim($user['remark']);
        $userName = (!empty($realName) ? $realName : $nickName);
        $profile = (!empty($personalImg) ? $personalImg : $profileImg);
        if (!empty($profile)) {
            $pictureData = trim($this->httpGet($profile));
            if (!empty($pictureData)) {
                $profile = base64_encode($pictureData);
            }
        }
        $data = array(
            'expert' => array(
                'name' => $userName,
                'profile' => $profile,
                'info' => $remark
            ),
            'planList' => array()
        );
        global $curEnv;
        $param = array();
        $param['userId'] = $userId;
        $param['publish'] = 1;
        if ($curEnv == 'dist') {
            $param['matchStatus'] = 1; //1=未开赛, 2=比赛中, 3=已结束, 4=未开赛+比赛中
        } else {
            $param['planId'] = array(748,801);
        }
        $selectPlanResp = $this->planService->selectPlan($param);
        if ($selectPlanResp->errCode != 0) {
            $this->resp->msg = "方案查询异常";
            $this->jsonView->out($this->resp);
        }
        $planList = $selectPlanResp->data['list'];
        $planList = $this->commonService->setResourcePath($planList);
        $planList = $this->commonService->setMatchList($planList);
        foreach ($planList as $plan) {
            $planId = (int)$plan['planId'];
            $resourceList = $plan['resourceList'];
            $matchList = $plan['matchList'];
            if ($planId <= 0 || !is_array($matchList) || count($matchList) <= 0) {
                continue;
            }
            $formatRecommendResp = $this->formatRecommend($matchList);
            $formatRecommendData = $formatRecommendResp->data;
            if ($formatRecommendResp->errCode != 0 || !is_array($formatRecommendData) || count($formatRecommendData) <= 0) {
                continue;
            }
            $imgArr = array();
            foreach ($resourceList as $resource) {
                if (!empty($resource)) {
                    $pictureData = trim(file_get_contents($resource));
                    if (!empty($pictureData)) {
                        $imgArr[] = base64_encode($pictureData);
                    }
                }
            }
            $planInfo = array();
            $planInfo['planNo'] = trim($this->common->encodeNo($userId, $planId));
            $planInfo['title'] = trim($plan['title']);
            $planInfo['matchType'] = (int)$plan['matchType'];
            $planInfo['matchList'] = $formatRecommendData;
            $planInfo['matchBeginTime'] = trim($plan['matchBeginTime']);
            $planInfo['amount'] = (int)$plan['amount'];
            $planInfo['content'] = trim($plan['content']);
            $planInfo['imageList'] = $imgArr;
            $planInfo['createTime'] = trim($plan['createTime']);
            $data['planList'][] = $planInfo;
        }
        $this->resp->data = $data;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
	}

    public function planList() {
        if (!$this->verifySign()) {
            $this->resp->msg = "验签失败";
            $this->jsonView->out($this->resp);
        }
        $userNoArr = $this->partner['userNoArr'];
        if (!is_array($userNoArr) || count($userNoArr) <= 0) {
            $this->resp->msg = "没有专家的访问权限";
            $this->jsonView->out($this->resp);
        }
        $planNo = trim($this->common->getParam("planNo", ''));
        if (empty($planNo)) {
            $this->resp->msg = "planNo参数有误";
            $this->jsonView->out($this->resp);
        }
        $planNo = explode(',', $planNo);
        if (!is_array($planNo) || count($planNo) < 1) {
            $this->resp->msg = "planNo参数有误";
            $this->jsonView->out($this->resp);
        }
        $planIdArr = array();
        foreach ($planNo as $item) {
            $noArr = $this->common->decodeNo($item);
            $planId = (int)$noArr['id'];
            if ($planId <= 0) {
                $this->resp->msg = "存在错误的planNo";
                $this->jsonView->out($this->resp);
            }
            $planIdArr[] = $planId;
        }
        $param = array();
        $param['planId'] = $planIdArr;
        $selectPlanResp = $this->planService->selectPlan($param);
        if ($selectPlanResp->errCode != 0) {
            $this->resp->msg = "方案查询异常";
            $this->jsonView->out($this->resp);
        }
        $planList = $selectPlanResp->data['list'];
        $planList = $this->commonService->setMatchList($planList);
        $data = array();
        foreach ($planList as $plan) {
            $userId = (int)$plan['userId'];
            $planId = (int)$plan['planId'];
            $matchList = $plan['matchList'];
            if ($userId <= 0 || $planId <= 0 || !is_array($matchList) || count($matchList) <= 0) {
                continue;
            }
            $userNo = trim($this->common->encodeNo($userId, $userId+12345678));
            if (!in_array($userNo, $userNoArr)) {
                $this->resp->msg = "没有该专家的访问权限";
                $this->jsonView->out($this->resp);
            }
            $formatRecommendResp = $this->formatRecommend($matchList);
            $formatRecommendData = $formatRecommendResp->data;
            if ($formatRecommendData->errCode != 0 || !is_array($formatRecommendData) || count($formatRecommendData) <= 0) {
                continue;
            }
            $planInfo = array();
            $planInfo['planNo'] = trim($this->common->encodeNo($userId, $planId));
            $planInfo['title'] = trim($plan['title']);
            $planInfo['matchType'] = (int)$plan['matchType'];
            $planInfo['matchList'] = $formatRecommendData;
            $planInfo['matchBeginTime'] = trim($plan['matchBeginTime']);
            $planInfo['amount'] = (int)$plan['amount'];
            $planInfo['content'] = trim($plan['content']);
            $planInfo['createTime'] = trim($plan['createTime']);
            $planInfo['prizeStatus'] = (int)$plan['prizeStatus'];//中奖状态, 0=未开奖, 1=已中奖, 2=未中奖
            $data['list'][] = $planInfo;
        }
        $this->resp->data = $data;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

	//验证签名
	private function verifySign() {
        $partnerKey = trim($this->partner['partnerKey']);
        if (empty($this->partner) || empty($partnerKey)) {
            return false;
        }
        $keys = array_keys($_POST);
        ksort($keys);
        $param = [];
        foreach ($keys as $key) {
            $key = trim($key);
            $value = $_POST[$key];
            if (empty($key) || empty($value) || $key == 'sign') {
                continue;
            }
            $param[] = $key.'='.$value;
        }
        $param = implode('&', $param);
        return md5($param.$partnerKey) == trim($_POST['sign']);
    }

	private function formatRecommend($matchList) {
        $resp = requireModule('Resp');
        if (!is_array($matchList) || count($matchList) <= 0) {
            $resp->msg = '参数异常';
            return $resp;
        }
        $data = array();
        foreach ($matchList as $match) {
            $commonMatchId = trim($match['commonMatchId']);
            $number = trim($match['number']);
            $league = trim($match['league']);
            $home = trim($match['home']);
            $away = trim($match['away']);
            $beginTime = trim($match['beginTime']);
            $bettypeContent = trim($match['bettypeContent']);
            $bettypeName = trim($match['bettypeName']);
            $bettypeOdds = $match['bettypeOdds'];
            $concede = trim($match['concede']);
            $recommend = $match['recommend'];
            $halfResult = trim($match['halfResult']);
            $result = trim($match['result']);
            $bettypeResult = $match['bettypeResult'];
            if (empty($commonMatchId) || empty($bettypeContent) || !is_array($recommend) || count($recommend) <= 0) {
                $resp->msg = '比赛信息有误';
                return $resp;
            }
            $format = $bettypeContent.':['.implode(',', $recommend).']';//format:"SPF:[S,F]";
            $data[] = array(
                'commonMatchId' => $commonMatchId,
                'format' => $format,
                'number' => $number,
                'league' => $league,
                'home' => $home,
                'away' => $away,
                'beginTime' => $beginTime,
                'bettypeContent' => $bettypeContent,
                'bettypeName' => $bettypeName,
                'bettypeOdds' => $bettypeOdds,
                'concede' => $concede,
                'recommend' => $recommend,
                'halfResult' => $halfResult,
                'result' => $result,
                'bettypeResult' => $bettypeResult
            );
        }
        $resp->data = $data;
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }

    function httpGet($durl){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $durl);
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        curl_setopt($ch, CURLOPT_USERAGENT, _USERAGENT_);
        curl_setopt($ch, CURLOPT_REFERER,_REFERER_);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $r = curl_exec($ch);
        curl_close($ch);
        return $r;
    }

    public function getImageInfo() {
        $userNoList = $this->tencentPartner['userNoArr'];
        foreach ($userNoList as $userNo) {
            $noArr = $this->common->decodeNo($userNo);
            $userId = (int)$noArr['userId'];
            $selectUserByIdResp = $this->userService->selectUserById($userId);
            if ($selectUserByIdResp->errCode != 0) {
                $this->resp->msg = "专家查询异常";
                $this->jsonView->out($this->resp);
            }
            $user = $selectUserByIdResp->data;
            if (empty($user)) {
                $this->resp->msg = "专家数量错误";
                $this->jsonView->out($this->resp);
            }
            $nickName = trim($user['nickName']);
            $realName = trim($user['realName']);
            $userName = !empty($realName) ? $realName : $nickName;
            $profileImg = trim($user['profileImg']);
            $personalImg = trim($user['personalImg']);
            $profile = (!empty($personalImg) ? $personalImg : $profileImg);
            if (!empty($profile)) {
                $pictureData = trim($this->httpGet($profile));
                if (!empty($pictureData)) {
                    $imgDir = './tencent_sport/images/';
                    if (!is_dir($imgDir)) {
                        mkdir($imgDir,0777,true);
                    }
                    $filename= $userName.'.jpg';
                    $filePath = './'.$imgDir.$filename;
                    if(file_exists($filePath)) {
                        unlink($filePath);
                    }
                    file_put_contents($filePath,$pictureData);
                }
            }
        }
        $this->resp->errCode = 0;
        $this->resp->msg = "保存成功";
        $this->jsonView->out($this->resp);
    }

    public function getUserInfo() {
        $userNoList = $this->tencentPartner['userNoArr'];
        $userIdArr = array();
        foreach ($userNoList as $userNo) {
            $noArr = $this->common->decodeNo($userNo);
            $userIdArr[] = (int)$noArr['userId'];
        }
        $param = array();
        $param['userId'] = $userIdArr;
        $selectUserResp = $this->userService->selectUser($param);
        if ($selectUserResp->errCode != 0) {
            $this->resp->msg = "专家查询异常";
            $this->jsonView->out($this->resp);
        }
        $userList = $selectUserResp->data['list'];
        if (count($userNoList) != count($userList)) {
            $this->resp->msg = "专家数量错误";
            $this->jsonView->out($this->resp);
        }
        $userMap = array();
        foreach ($userList as $user) {
            $userInfo = array();
            $userId = (int)$user['userId'];
            $userNo = $this->common->encodeNo($userId, $userId+12345678);
            if ($userId <= 0 || !in_array($userNo, $userNoList)) {
                $this->resp->msg = "专家". $userNo ."信息错误";
                $this->jsonView->out($this->resp);
            }
            $type = '足球';
            if (in_array($userNo, array('53B006C-17A4357', '53984E7-178C7D2', '53995D9-178D8C4', '539A135-178E420', '539A134-178E41F', '53984E5-178C7D0'))) {
                $type = '篮球';
            }
            $nickName = trim($user['nickName']);
            $realName = trim($user['realName']);
            $userInfo['type'] = $type;
            $userInfo['name'] = !empty($realName) ? $realName : $nickName;
            $userInfo['remark'] = trim($user['remark']);
            $userMap[] = $userInfo;
        }
        $userMap = json_encode($userMap, JSON_UNESCAPED_UNICODE);
        if (!empty($userMap)) {
            $infoDir = './tencent_sport/';
            if (!is_dir($infoDir)) {
                mkdir($infoDir,0777,true);
            }
            $filename= 'user_json.txt';
            $filePath = './'.$infoDir.$filename;
            if(file_exists($filePath)) {
                unlink($filePath);
            }
            file_put_contents($filePath,$userMap);
        }
        $this->resp->errCode = 0;
        $this->resp->msg = "保存成功";
        $this->jsonView->out($this->resp);
    }
}