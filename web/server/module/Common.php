<?php
namespace module;
class Common {
	public function authcode($string, $operation = 'DECODE', $key = '', $expiry = 0) {
		$ckey_length = 4;
		//$key = md5($key ? $key : $GLOBALS['discuz_auth_key']);
		$key = md5($key);
		$keya = md5(substr($key, 0, 16));
		$keyb = md5(substr($key, 16, 16));
		$keyc = $ckey_length ? ($operation == 'DECODE' ? substr($string, 0, $ckey_length): substr(md5(microtime()), -$ckey_length)) : '';
		$cryptkey = $keya.md5($keya.$keyc);
		$key_length = strlen($cryptkey);
		$string = $operation == 'DECODE' ? base64_decode(substr($string, $ckey_length)) : sprintf('%010d', $expiry ? $expiry + time() : 0).substr(md5($string.$keyb), 0, 16).$string;
		$string_length = strlen($string);
		$result = '';
		$box = range(0, 255);
		$rndkey = array();
		for($i = 0; $i <= 255; $i++) {
			$rndkey[$i] = ord($cryptkey[$i % $key_length]);
		}
		for($j = $i = 0; $i < 256; $i++) {
			$j = ($j + $box[$i] + $rndkey[$i]) % 256;
			$tmp = $box[$i];
			$box[$i] = $box[$j];
			$box[$j] = $tmp;
		}
		for($a = $j = $i = 0; $i < $string_length; $i++) {
			$a = ($a + 1) % 256;
			$j = ($j + $box[$a]) % 256;
			$tmp = $box[$a];
			$box[$a] = $box[$j];
			$box[$j] = $tmp;
			$result .= chr(ord($string[$i]) ^ ($box[($box[$a] + $box[$j]) % 256]));
		}
		if($operation == 'DECODE') {
			if((substr($result, 0, 10) == 0 || substr($result, 0, 10) - time() > 0) && substr($result, 10, 16) == substr(md5(substr($result, 26).$keyb), 0, 16)) {
				return substr($result, 26);
			} else {
				return '';
			}
		} else {
			return $keyc.str_replace('=', '', base64_encode($result));
		}
	}

	public function  parseRoute($uri) {
        $resp = requireModule('Resp');
        $uri = trim($uri);
        if (empty($uri)) {
            $resp->msg = '请求uri异常';
            return $resp;
        }
        $rule = "/^.*?\\?.*?(p=\\w+&)?c=(\\w+)&m=(\\w+)/";
        preg_match ($rule, $uri, $matches);
        if (!is_array($matches) || count($matches) != 4) {
            $resp->msg = '路由映射异常';
            return $resp;
        }
        $projectName = trim($matches[1]);
        $controllerName = trim($matches[2]);
        $controllerMethod = trim($matches[3]);

        //兼容老cgi
        if (empty($projectName)) {
            $projectName = 'p=portal&';
        }
        $projectName = preg_replace("/p\=|&/", "", $projectName);

        if (empty($projectName) || empty($controllerName) || empty($controllerMethod)) {
            $resp->msg = '路由映射异常';
            return $resp;
        }
        //控制器不能叫 static|slave|cache 名字, 忽略大小写
        if (preg_match('/^static$|^slave$|^cache$/i', $controllerMethod)) {
            $resp->msg = $controllerMethod." 是敏感关键词, 不能做controller函数";
            return $resp;
        }
        //控制器名确保首字母大写
        $controllerName = ucfirst($controllerName);
        $controller = requireController($controllerName, 'controller\\'.$projectName);
        if (empty($controller)) {
            $resp->msg = '控制器异常';
            return $resp;
        }
        if (!method_exists($controller, $controllerMethod) && !method_exists($controller, $controllerMethod.'Static') && !method_exists($controller, $controllerMethod.'Slave') && !method_exists($controller, $controllerMethod.'Cache')) {
            $resp->msg = "不存在 ".$controllerMethod." 方法";
            return $resp;
        }
        $resp->data = array(
            'projectName' => $projectName,
            'controllerName' => $controllerName,
            'controllerMethod'=> $controllerMethod,
            'controller'=> $controller
        );
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
    }

	public function getParam($name, $default=null) {
		$value = null;
		if (isset($_GET[$name])) {
			$value = $_GET[$name];
		} else if (isset($_POST[$name])) {
			$value = $_POST[$name];
		} else if (isset($_FILES[$name])) {
			$value = $_FILES[$name];
		}
		if ($value === null) {
			$value = $default;
		}
		if (is_numeric($value)) {
			$value = $value;
		} else if (is_string($value)) {
			$value = trim($value);
			if ($value == 'true') {
				$value = true;
			} else if ($value == 'false') {
				$value = false;
			}
		}
		return $value;
	}

	public function getIP() {
		/*$realip = '';
		if (isset($_SERVER)) {
			if (isset($_SERVER["HTTP_X_FORWARDED_FOR"])) {
				$realip = $_SERVER["HTTP_X_FORWARDED_FOR"];
			} else if (isset($_SERVER["HTTP_CLIENT_IP"])) {
				$realip = $_SERVER["HTTP_CLIENT_IP"];
			} else {
				$realip = $_SERVER["REMOTE_ADDR"];
			}
		} else {
			if (getenv("HTTP_X_FORWARDED_FOR")) {
				$realip = getenv("HTTP_X_FORWARDED_FOR");
			} else if (getenv("HTTP_CLIENT_IP")) {
				$realip = getenv("HTTP_CLIENT_IP");
			} else {
				$realip = getenv("REMOTE_ADDR");
			}
		}
		return $realip;*/
		return $_SERVER["REMOTE_ADDR"];
	}

	public function getHttpHeaders() {
        $headers = array();
        foreach ($_SERVER as $key => $value) {
            if ('HTTP_' == substr($key, 0, 5)) {
                $headers[str_replace('_', '-', substr($key, 5))] = $value;
            }
        }
        return $headers;
    }

	public function getServerName() {
		$serverName = '';
		$pattern = '/^(?:\w+?\.)+(?:net|com|cn)$/';
		if (isset($_SERVER)) {
			if (isset($_SERVER["SERVER_NAME"]) && preg_match($pattern, $_SERVER["SERVER_NAME"])) {
				$serverName = $_SERVER["SERVER_NAME"];
			} else if (isset($_SERVER["HTTP_HOST"]) && preg_match($pattern, $_SERVER["HTTP_HOST"])) {
				$serverName = $_SERVER["HTTP_HOST"];
			} else if (isset($_SERVER["HTTP_X_FORWARDED_SERVER"]) && preg_match($pattern, $_SERVER["HTTP_X_FORWARDED_SERVER"])) {
				$serverName = $_SERVER["HTTP_X_FORWARDED_SERVER"];
			} else if (isset($_SERVER["HTTP_X_FORWARDED_HOST"]) && preg_match($pattern, $_SERVER["HTTP_X_FORWARDED_HOST"])) {
				$serverName = $_SERVER["HTTP_X_FORWARDED_HOST"];
			}
		}
		return $serverName;
	}

	public function getDomain() {
		$domain = '';
		$serverName = $this->getServerName();
		if ($serverName != '') {
			$pattern = '/^\w+?\.+(?:net|com|cn)$/';
			if (preg_match($pattern, $serverName)) {
				$domain = '.'.$serverName;
			} else {
				$domain = preg_replace('/^\w+?\./', '.', $serverName, 1);
			}
		}
		return $domain;
	}

	public function getUserAuth($project) {
		global $settingConfig;
	    global $curEnv;
	    $name = trim($settingConfig->name);
        $uoAuthKey = md5($name.'_'.$project.'_uoAuth_'.$curEnv);
        $uoSignKey = md5($name.'_'.$project.'_uoSign_'.$curEnv);
        $uoAuthCookie = $project."_uo_auth";
        $uoSignCookie = $project."_uo_sign";
		$auth = null;
		$uoAuth = trim($this->getParam("uoAuth", null));
		$uoSign = trim($this->getParam("uoSign", null));
		if ((empty($uoAuth) || empty($uoSign)) && !empty($_COOKIE[$uoAuthCookie]) && !empty($_COOKIE[$uoSignCookie])) {
			$uoAuth = trim($_COOKIE[$uoAuthCookie]);
			$uoSign = trim($_COOKIE[$uoSignCookie]);
		}
		if (!empty($uoAuth) && !empty($uoSign)) {
			//验证uoAuth是否被串改
			if (md5($uoAuth.'|'.$uoSignKey) == $uoSign) {
				//解码
				$uoAuth = trim($this->authcode($uoAuth, 'DECODE', $uoAuthKey));
				if (!empty($uoAuth)) {
					if ($project == 'portal') {
						$authVersion = 1;
                        $uoAuthArr = explode('|', $uoAuth);
                        $userId = (int)$uoAuthArr[0];
                        $unionId = trim($uoAuthArr[1]);
                        $time = (int)$uoAuthArr[2];
                        $version = (int)$uoAuthArr[3];
                        if ($userId > 0 && !empty($unionId) && $version == $authVersion) {
                            $auth = array('userId' => $userId, 'unionId' => $unionId);
                        }
                    } else if ($project == 'admin') {
                    	$authVersion = 1;
                        $uoAuthArr = explode('|', $uoAuth);
                        $userId = (int)$uoAuthArr[0];
                        $time = (int)$uoAuthArr[1];
                        $version = (int)$uoAuthArr[2];
                        if ($userId > 0 && $time > time() && $version == $authVersion) {
                            $auth = array('userId' => $userId);
                        }
                    }
				}
			}
		}
		return $auth;
	}

	public function setUserAuth($project, $param) {
        global $settingConfig;
        global $curEnv;
        $name = trim($settingConfig->name);
        $uoAuthKey = md5($name.'_'.$project.'_uoAuth_'.$curEnv);
        $uoSignKey = md5($name.'_'.$project.'_uoSign_'.$curEnv);
        $uoAuthCookie = $project."_uo_auth";
        $uoSignCookie = $project."_uo_sign";
        $domain = $this->getDomain();
        $auth = null;
        if ($project == 'portal') {
            $isApp = $this->isApp();
            $userId = (int)$param['userId'];
            $unionId = trim($param['unionId']);
            $time = time() + (3600*24*15);//15天
            $authVersion = 1;
            if ($userId > 0 && !empty($unionId) && !empty($domain)) {
                $uoAuth = trim($this->authcode($userId.'|'.$unionId.'|'.$time.'|'.$authVersion, 'ENCODE', $uoAuthKey));
                $uoSign = md5($uoAuth.'|'.$uoSignKey);
                $auth = array('uoAuth' => $uoAuth, 'uoSign' => $uoSign);
                if (!$isApp) {
                    setcookie('is_login', 'true', $time, '/', $domain, false);//只给前端使用而已,不参与权限校验
                    setcookie($uoAuthCookie, $uoAuth, $time, '/', $domain, false, true);
                    setcookie($uoSignCookie, $uoSign, $time, '/', $domain, false, true);
                }
            }
        } else if ($project == 'admin') {
            $userId = (int)$param['userId'];
            $time = time() + (3600*24*15);//15天
            $authVersion = 1;
            if ($userId > 0 && !empty($domain)) {
                $uoAuth = trim($this->authcode($userId.'|'.$time.'|'.$authVersion, 'ENCODE', $uoAuthKey));
                $uoSign = md5($uoAuth.'|'.$uoSignKey);
                setcookie($uoAuthCookie, $uoAuth, 0, '/', $domain, false, true);
                setcookie($uoSignCookie, $uoSign, 0, '/', $domain, false, true);
            }
        }
		return $auth;
	}

    public function unsetUserAuth($project) {
        $uoAuthCookie = $project."_uo_auth";
        $uoSignCookie = $project."_uo_sign";
        $domain = $this->getDomain();
        setcookie($uoAuthCookie, '', -100000, '/', $domain, false, true);
        setcookie($uoSignCookie, '', -100000, '/', $domain, false, true);
    }

	public function getUserRight($userRight) {
		//userRight权限低位开始，第1位=1(推荐权限), 第2位=1(推广权限)
		$userRightMap = array(
			'1' => false,//推荐权限
			'2' => false,//推广权限
            '3' => false//数字彩推荐权限
		);
		$userRightMap['1'] = ($userRight & pow(2, 0)) != 0;
		$userRightMap['2'] = ($userRight & pow(2, 1)) != 0;
		$userRightMap['3'] = ($userRight & pow(2, 2)) != 0;
		return $userRightMap;
	}

	//编码编号
	public function encodeNo($userId, $id) {
		$userId = (int)$userId;
		$id = (int)$id;
		return strtoupper(dechex($userId+87654321).'-'.dechex($id+12345678));
	}

	//解码编号
	public function decodeNo($no) {
		$ret = null;
		$no = strtolower($no);
		$arr = explode('-', $no);
		$userId = (int)(hexdec($arr[0])-87654321);
		$id = (int)(hexdec($arr[1])-12345678);
		if ($userId > 0 && $id > 0) {
			$ret = array("userId" => $userId, 'id' => $id);
		}
		return $ret;
	}

	//过滤掉数组中小于0,去重复
	public function filterIdArray($arr) {
		$newArr = array();
		if (is_array($arr)) {
			foreach ($arr as $id) {
				$id = (int)$id;
				if ($id > 0) {
					$newArr[] = $id;
				}
			}
			$newArr = array_unique($newArr);
		}
		return $newArr;
	}

	//过滤掉数组中非数字,去重复, 可以保留负数和小数
	public function filterNumArray($arr) {
		$newArr = array();
		if (is_array($arr)) {
			foreach ($arr as $num) {
				if (is_numeric($num)) {
					$newArr[] = $num;
				}
			}
			$newArr = array_unique($newArr);
		}
		return $newArr;
	}

	public function verifyMobile($mobile) {
		$mobile = trim($mobile);
		//移动号段
		$yd = array(134,135,136,137,138,139,147,150,151,152,157,158,159,178,182,183,184,187,188);
		//联通号段
		$lt = array(130,131,132,145,155,156,171,175,176,185,186);
		//电信号段
		$dx = array(133,149,153,173,177,180,181,189);
		//虚拟运营商
		$xn = array(170);
		$prefix = array_merge($yd, $lt, $dx, $xn);
		$mobilePrefix = substr($mobile, 0, 3);
		return preg_match("/^\d{11}$/", $mobile) && in_array($mobilePrefix, $prefix);
	}

	public function isApp() {
		$source = (int)$this->getSource();
		return $source === 1 || $source === 2;
	}

	public function isMock() {
		$mock = false;
		$branch = (int)$this->getParam("branch", 0);//产品分支：0=晒米场, 1=晒米彩票, 2=晒米竞彩, 3=晒米彩票Pro(暂定)
		$userAuth = $this->getUserAuth('portal');
		$unionId = trim($userAuth['unionId']);
		/*//对13800000000特别处理
		if ($branch != 0 && $branch != 2 && $unionId == '13800000000') {
			$mock = true;
		}*/
		return $mock;
	}

	public function getOrderNumeric($order) {
		$orderNumeric = null;
		if (empty($order)) {
			return $orderNumeric;
		}
		$orderId = (int)$order['orderId'];
		$orderType = (int)$order['orderType'];
		$status = (int)$order['status'];
		$amount = (int)$order['amount'];
		$userId = (int)$order['userId'];
		$createTime = (int)strtotime(trim($order['createTime']));
		if ($orderId <= 0 || $status <= 0 || $amount <= 0|| $userId <= 0 || $createTime <= 0) {
			return $orderNumeric;
		}
		$orderNumeric = ($createTime%9).($userId%9).($orderId%9).$orderType.$status.($amount%9).$orderId;
		return $orderNumeric;
	}

	public function getSource() {
		//来源, 0=h5, 1=android, 2=ios
		$source = trim($this->getParam("source", ''));
		if ($source == 'h5') {
			$source = 0;
		} else if ($source == 'android') {
			$source = 1;
		} else if ($source == 'ios') {
			$source = 2;
		}
		$source = (int)$source;
		return $source;
	}

	public function getTradeType($user) {
		$tradeType = (int)$this->getParam("tradeType", 0);//交易方式, 0=爱贝, 1=支付宝, 2=威富通
		if (!empty($user)) {
			$userAgent = trim($_SERVER['HTTP_USER_AGENT']);
			$openId = trim($user['openId']);
			if (strpos($userAgent, 'MicroMessenger') !== false && !empty($openId)) {
				$tradeType = 2;
			}
		}
		$branch = (int)$this->getParam("branch", 0);//产品分支：0=晒米场, 1=晒米彩票, 2=晒米竞彩, 3=米多多
		$source = (int)$this->getSource();//来源, 0=h5, 1=android, 2=ios
		$version = trim($this->getParam("version", ''));
		if ($branch == 0 && $source == 2 && !empty($version) && $version <= '1.6.1') {
			$tradeType = 0;
		} else if ($tradeType == 0) {
			$tradeType = 1;//默认 "爱贝" 转 "支付宝"
		}
		$userAgent = trim($_SERVER['HTTP_USER_AGENT']);
		if (strpos($userAgent, 'MicroMessenger') !== false) {
			$tradeType = 1;//临时 "威富通" 转 "支付宝"
		}
		return $tradeType;
	}

	public function isShowWinCount() {
		//解决老版 winRate 和 winCount 相同问题
		$branch = (int)$this->getParam("branch", 0);
		$source = (int)$this->getParam("source", 0);
		$version = trim($this->getParam("version", ''));
		$showWinCount = false;
		if ($source == 0) {
			$showWinCount = true;
		} else if ($branch == 1) {//晒米竞猜
			if (($source == 1 && $version >= '1.2.0') || ($source == 2 && $version >= '2.1.1')) {
				$showWinCount = true;
			}
		} else {//晒米场
			if (($source == 1 && $version >= '2.3.0') || ($source == 2 && $version >= '2.1.1') || ($branch == 0 && $source == 2 && $version >= '2.0.0')) {
				$showWinCount = true;
			}
		}
		return $showWinCount;
	}

	//四舍六入五成双
	//"四"是指≤4 时舍去，"六"是指≥6时进上
	//"五"指的是根据5后面的数字来定，当5后有数时，舍5入1；当5后无有效数字时，需要分两种情况来讲：①5前为奇数，舍5入1；②5前为偶数，舍5不进。(0是最小的偶数)
	public function round($num, $precision = 1) {
		$pow = pow(10, $precision);
		if ((floor($num * $pow * 10) % 5 == 0) && (floor($num * $pow * 10) == $num * $pow * 10) && (floor($num * $pow) % 2 == 0)) {
			//舍去位为5 && 舍去位后无数字 && 舍去位前一位是偶数 => 不进一
			return floor($num * $pow) / $pow;
		} else {
			//四舍五入
			return round($num, $precision);
		}
	}

	//四舍六入(赔率sp计算)
	//四舍六入五考虑的原则进行取舍留两位，五前（即第二位小数）为偶数舍去第三位，五前（即第二位小数）为奇数要进一再舍去第三位
	public function roundSp($num, $precision = 1) {
		//(string)：目的在于php浮点精度丢失，(string)可以在最大小数位进行四舍五入，把丢失的精度还原
		$num = (string)$num;
		$pow = pow(10, $precision);
		$w2 = (string)($num * $pow);
		$w3 = (string)($num * $pow * 10);
		if ((floor($w3) % 5 == 0) && (floor($w2) % 2 == 0)) {
			//舍去位为5 && 舍去位前一位是偶数 => 不进一
			return floor($w2) / $pow;
		} else {
			//四舍五入
			return round($num, $precision);
		}
	}

	//从arr挑num个组合
	public function ZH($arr, $num) {
		/*
        function ZH(arr, num){
             var r=[];
             (function f(t,a,n){
                 if (n==0) return r.push(t);
                 for (var i=0,l=a.length; i<=l-n; i++){
                     f(t.concat(a[i]), a.slice(i+1), n-1);
                 }
             })([],arr,num);
             return r;
         }
        */
		$ret = array();
		$doZH = function ($arr, $num, $now = array()) use (&$ret, &$doZH) {
			if ($num == 0) {
				return array_push($ret, $now);
			}
			for ($i = 0, $length = count($arr); $i <= $length - $num; $i++) {
				$doZH(array_slice($arr, $i + 1), $num - 1, array_merge($now, array($arr[$i])));
			}
		};
		$doZH($arr, $num);
		return $ret;
	}


	public function PL($arr, $num) {
		/*
        function PL(arr, num){
            var r=[];
            (function f(t,a,n){
                if (n==0) return r.push(t);
                for (var i=0,l=a.length; i<l; i++){
                    f(t.concat(a[i]), a.slice(0,i).concat(a.slice(i+1)), n-1);
                }
            })([],arr,num);
            return r;
        }
        */
		$ret = array();
		$doZH = function ($arr, $num, $now = array()) use (&$ret, &$doZH) {
			if ($num == 0) {
				return array_push($ret, $now);
			}
			for ($i = 0, $length = count($arr); $i < $length; $i++) {
				$doZH(array_slice($arr, $i + 1), $num - 1, array_merge($now, array($arr[$i])));
			}
		};
		$doZH($arr, $num);
		return $ret;
	}

    public function getVerificationCode() {
        global $curEnv;
        $codeAuthKey = 'shaimi_code_auth_'.$curEnv;
        $codeSignKey = 'shaimi_code_sign_'.$curEnv;
        $authVersion = 1;
        $auth = null;
        $codeAuth = trim($this->getParam("codeAuth", null));
        $codeSign = trim($this->getParam("codeSign", null));
        if ((empty($codeAuth) || empty($codeSign)) && !empty($_COOKIE["code_auth"]) && !empty($_COOKIE["code_sign"])) {
            $codeAuth = trim($_COOKIE["code_auth"]);
            $codeSign = trim($_COOKIE["code_sign"]);
        }
        if (!empty($codeAuth) && !empty($codeSign)) {
            //验证uoAuth是否被串改
            if (md5($codeAuth.'|'.$codeSignKey) == $codeSign) {
                //解码
                $codeAuth = trim($this->authcode($codeAuth, 'DECODE', $codeAuthKey));
                if (!empty($codeAuth)) {
                    $codeAuthArr = explode('|', $codeAuth);
                    $code = trim($codeAuthArr[0]);
                    $version = (int)$codeAuthArr[1];
                    if (!empty($code) && $version == $authVersion) {
                        $auth = strtolower($code);
                    }
                }
            }
        }
        return $auth;
    }

    public function setVerificationCode($code) {
        global $curEnv;
        $codeAuthKey = 'shaimi_code_auth_'.$curEnv;
        $codeSignKey = 'shaimi_code_sign_'.$curEnv;
        $code = trim($code);
        $domain = $this->getDomain();
        $time = null;
        $authVersion = 1;
        $auth = null;
        if (!empty($code) && !empty($domain)) {
            $codeAuth = trim($this->authcode($code.'|'.$authVersion, 'ENCODE', $codeAuthKey));
            $codeSign = md5($codeAuth.'|'.$codeSignKey);
            $auth = array('codeAuth' => $codeAuth, 'codeSign' => $codeSign);
            setcookie('code_auth', $codeAuth, $time, '/', $domain, false, true);
            setcookie('code_sign', $codeSign, $time, '/', $domain, false, true);
        }
        return $auth;
    }
}