<?php
namespace module;
class Jssdk {
    private $appId;
    private $appSecret;
    private $common;
    private $weixinService;
    private $userService;

    public function __construct() {
        global $curEnvConfig;
        $this->common = requireModule("Common");
        $this->weixinService = requireService("Weixin");
        $this->userService = requireService("User");
        $weixinConfig = $curEnvConfig->weixin;
        if (empty($weixinConfig) || empty($weixinConfig->appId) || empty($weixinConfig->appSecret)) {
            $this->common->logger->warn('微信配置有误');
            return;
        }
        $this->appId = $weixinConfig->appId;
        $this->appSecret = $weixinConfig->appSecret;
    }

    public function getSignPackage($url) {
        $jsapiTicket = $this->getJsApiTicket();
        // 注意 URL 一定要动态获取，不能 hardcode.
        //$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
        //$url = "$protocol$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
        //兼容代理访问
        //$url = "$protocol".$this->common->getServerName()."$_SERVER[REQUEST_URI]";
        $timestamp = time();
        $nonceStr = $this->createNonceStr();
        // 这里参数的顺序要按照 key 值 ASCII 码升序排序
        $string = "jsapi_ticket=$jsapiTicket&noncestr=$nonceStr&timestamp=$timestamp&url=$url";
        $signature = sha1($string);
        $signPackage = array(
            "appId"     => $this->appId,
            "nonceStr"  => $nonceStr,
            "timestamp" => $timestamp,
            "url"       => $url,
            "signature" => $signature,
            "rawString" => $string
        );
        return $signPackage;
    }

    private function createNonceStr($length = 16) {
        $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        $str = "";
        for ($i = 0; $i < $length; $i++) {
            $str .= substr($chars, mt_rand(0, strlen($chars) - 1), 1);
        }
        return $str;
    }

    public function getJsApiTicket() {
        $jsapiTicket = '';
        $keyId = 1;
        $selectWeixinKeyByIdResp = $this->weixinService->selectWeixinKeyById($keyId);
        if ($selectWeixinKeyByIdResp->errCode != 0) {
            return $jsapiTicket;
        }
        $data = $selectWeixinKeyByIdResp->data;
        $jsapiTicket = trim($data['jsapiTicket']);
        $jsapiTicketExpireTime = (int)$data['jsapiTicketExpireTime'];
        if ($jsapiTicketExpireTime < time()) {
            $accessToken = $this->getAccessToken();
            // 如果是企业号用以下 URL 获取 ticket
            // $url = "https://qyapi.weixin.qq.com/cgi-bin/get_jsapi_ticket?access_token=$accessToken";
            $url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token=$accessToken";
            $res = json_decode($this->httpGet($url));
            $jsapiTicket = $res->ticket;
            if ($jsapiTicket) {
                $param = array();
                $param['keyId'] = $keyId;
                $param['jsapiTicket'] = $jsapiTicket;
                $param['jsapiTicketExpireTime'] = time() + 7000;
                $this->weixinService->updateWeixinKey($param);
            }
        }
        return $jsapiTicket;
    }

    public function getAccessToken() {
        $accessToken = '';
        $keyId = 1;
        $selectWeixinKeyByIdResp = $this->weixinService->selectWeixinKeyById($keyId);
        if ($selectWeixinKeyByIdResp->errCode != 0) {
            return $accessToken;
        }
        $data = $selectWeixinKeyByIdResp->data;
        $accessToken = trim($data['accessToken']);
        $accessTokenExpireTime = (int)$data['accessTokenExpireTime'];
        if ($accessTokenExpireTime < time()) {
            // 如果是企业号用以下URL获取access_token
            // $url = "https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=$this->appId&corpsecret=$this->appSecret";
            $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=$this->appId&secret=$this->appSecret";
            $res = json_decode($this->httpGet($url));
            $accessToken = $res->access_token;
            if ($accessToken) {
                $param = array();
                $param['keyId'] = $keyId;
                $param['accessToken'] = $accessToken;
                $param['accessTokenExpireTime'] = time() + 7000;
                $this->weixinService->updateWeixinKey($param);
            }
        }
        return $accessToken;
    }

    public function pushMessage($param) {
        $resp = requireModule('Resp');
        $userId = $param['userId'];
        $title = trim($param['title']);
        $date = trim($param['date']);
        $content = trim($param['content']);
        $remark = trim($param['remark']);
        $userIdArr = array();
        if (is_numeric($userId)) {
            $userId = (int)$userId;
            if ($userId >= 0) {
                $userIdArr[] = $userId;
            }
        } else if (is_array($userId)) {
            $userIdArr = $this->common->filterIdArray($userId);
        }
        if (count($userIdArr) <= 0 || empty($title) || empty($content)) {
            $resp->msg = '参数有误';
            return $resp;
        }
        if (empty($date)) {
            $date = date('Y-m-d H:i:s');
        }
        $param = array();
        $param['userId'] = $userIdArr;
        $selectUserResp = $this->userService->selectUser($param);
        if ($selectUserResp->errCode != 0) {
            $resp->msg = '查询用户异常';
            return $resp;
        }
        $userList = $selectUserResp->data['list'];
        if (empty($userList) || count($userList) <= 0) {
            $resp->msg = '查询用户不存在';
            return $resp;
        }
        global $curEnv;
        if ($curEnv == 'dist') {
            $templateId = '_ptT__IpEwuXUXYwr02MNs4eYcL-o8PmaaQt8xD-Jn4';
        } else if ($curEnv == 'beta') {
            $templateId = '-UGL-dyE5_kfjsLx9mDDj0qdZAGL-8DLiQ3AQ49hiP4';
        }
        foreach ($userList as $user) {
            $openId = trim($user['openId']);
            $subscribe = (int)$user['subscribe'];
            if (empty($openId) || $subscribe != 1) {
                continue;
            }
            $data = array();
            $data['first'] = array('value' => $title, 'color' => '#ff0000');
            $data['keyword1'] = array('value' => $date, 'color' => '#ff0000');
            $data['keyword2'] = array('value' => $content, 'color' => '#ff0000');
            if (!empty($remark)) {
                $data['remark'] = array('value' => $remark, 'color' => '#000000');
            }
            $postJson = array(
                'touser' => $openId,
                'template_id' => $templateId,
                'data' => $data
            );
            $accessToken = $this->getAccessToken();
            $url = 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token='.$accessToken;
            $param = json_encode($postJson);
            $httpPostResp = $this->httpPost($url, $param);
            $respJson = json_decode($httpPostResp);
            if (empty($param) || empty($respJson) || $respJson->errcode != 0) {
                $this->common->logger->info('发送模版消息异常：'.$httpPostResp);
            }
        }
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;

    }

    public function httpGet($url) {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_TIMEOUT, 500);
        // 为保证第三方服务器与微信服务器之间数据传输的安全性，所有微信接口采用https方式调用，必须使用下面2行代码打开ssl安全校验。
        // 如果在部署过程中代码在此处验证失败，请到 http://curl.haxx.se/ca/cacert.pem 下载新的证书判别文件。
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, true);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, true);
        curl_setopt($curl, CURLOPT_URL, $url);
        $res = curl_exec($curl);
        curl_close($curl);
        return $res;
    }

    public function httpPost($url, $param) {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_TIMEOUT, 500);
        curl_setopt($curl, CURLOPT_HEADER, 0);
        /*
        * 在使用 curl 做 POST 的时候，当要 POST 的数据大于 1024 字节的时候，curl 并不会直接就发起 POST 请求，而是会分为两步：
       1. 发送一个请求，包含一个 "Expect: 100-continue" 头域，询问 Server 是否愿意接收数据；
       2. 接收到 Server 返回的 100-continue 应答以后，才把数据 POST 给 Server;
       PHP curl 遵从 libcurl 的特性。由于不是所有 web servers 都支持这个特性，
       所以会产生各种各样的错误。如果你遇到了，可以用下面的命令封禁"Expect"头域：
       */
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Expect:'));
        curl_setopt($curl, CURLOPT_POSTFIELDS, $param);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        $res = curl_exec($curl);
        curl_close($curl);
        return $res;
    }
}
