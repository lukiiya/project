<?php
namespace interceptor;
class RefuseIp {
	private $common;
	
	public function __construct() {
		$this->common = requireModule("Common");
	}

	public function execute() {
        $common = requireModule("Common");
        $ip = $common->getIP();
        $refuse = false;
        //ip黑名单
        $ipBlackArr = array();
        /*$ipBlackArr = array_unique($ipBlackArr);
        echo'array("'.implode('","', $ipBlackArr).'");';
        exit;*/
        /*echo count($ipBlackArr).' - ';
        $ipBlackArr = array_unique($ipBlackArr);
        echo count($ipBlackArr);exit;*/
        if (in_array($ip, $ipBlackArr)) {
            $refuse = true;
        }
        $headers = array();
        foreach ($_SERVER as $key => $value) {
            if ('HTTP_' == substr($key, 0, 5)) {
                $headers[str_replace('_', '-', substr($key, 5))] = $value;
            }
        }
        $refuseHeader = false;
        foreach ($headers as $name => $value) {
            $name = trim($name);
            $value = trim($value);
            if ($name == 'VIA') {
                $refuse = true;
                $refuseHeader = true;
                break;
            }
            if ($name == 'REFERER' && $value == 'http://www.shaimii.com/cgi/index.php?c=sms&m=sendSmsCode') {
                $refuse = true;
                $refuseHeader = true;
                break;
            }
            if ($name == 'USER-AGENT' && strpos($value, 'Apache-HttpClient') !== false) {
                $refuse = true;
                $refuseHeader = true;
                break;
            }
        }
        if ($refuseHeader) {
            $res = fopen("refuseIp.txt", "a+");
            fwrite($res, $ip."\n");
            fclose($res);
        }
        global $curEnv;
        if ($curEnv == 'dist' && $refuse) {
            header('HTTP/1.1 500 Internal Server Error');
            $common->logger->info('IP：'.$ip.' 被拒绝访问');
            exit;
        }
	}
}