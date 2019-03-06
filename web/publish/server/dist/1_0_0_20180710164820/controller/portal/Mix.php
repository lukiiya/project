<?php
namespace controller\portal;
use controller\Base;

class Mix extends Base {
	private $common;
	private $resp;
	private $jsonView;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->resp = requireModule("Resp");
		$this->jsonView = requireView("Json");
	}

	public function download() {
		global $curEnv;
		if (strpos($_SERVER['HTTP_USER_AGENT'], 'iPhone') || strpos($_SERVER['HTTP_USER_AGENT'], 'iPad')) {
			echo 'iPhone 或 iPad访问';
		} else if(strpos($_SERVER['HTTP_USER_AGENT'], 'Android')) {
			$updateUrl = '';
			if ($curEnv == 'dev' || $curEnv == 'beta') {
				$updateUrl = 'http://caifu-1251177394.cosgz.myqcloud.com/beta/shaimi/other/android/update.json';
			} else if ($curEnv == 'dist') {
				$updateUrl = 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/other/android/update.json';
			}
			if (!empty($updateUrl)) {
				$updateJson = trim(file_get_contents($updateUrl));
				$pattern  =  '/\{[\s\S]*\}/';
				$matches = array();
				preg_match($pattern, $updateJson, $matches);
				if (empty($matches) || count($matches) <= 0) {
					echo 'update.json格式有误';
					return;
				}
				$updateJson = json_decode(trim($matches[0]));
				$downloadUrl = '';
				if (!empty($updateJson)) {
					$downloadUrl = trim($updateJson->url);
				}
				if (!empty($downloadUrl)) {
					header("Location: ".$downloadUrl);
				}
			}
		} else {
			echo 'PC访问';
		}
	}

    public function multipleCgi() {
        $cgi = $this->common->getParam("cgi", null);
        if (!is_array($cgi) || count($cgi) <= 0) {
            $this->resp->msg = "参数有误";
            $this->jsonView->out($this->resp);
        }
        $cgiArr = array();
        foreach ($cgi as $uri) {
            $uri = trim(urldecode($uri));
            $parseRouteResp = $this->common->parseRoute($uri);
            if ($parseRouteResp->errCode != 0) {
                $this->resp->msg = $uri."解析异常";
                $this->jsonView->out($this->resp);
            }
            $parseRouteData = $parseRouteResp->data;
            $projectName = $parseRouteData['projectName'];
            $controllerName = $parseRouteData['controllerName'];
            $controllerMethod = $parseRouteData['controllerMethod'];
            $controller = $parseRouteData['controller'];
            $uriArr = parse_url($uri);
            if (empty($uriArr) || empty(trim($uriArr['query']))) {
                $this->resp->msg = $uri."解析异常";
                $this->jsonView->out($this->resp);
            }
            $query = trim($uriArr['query']);
            parse_str($query, $param);
            $cgiArr[] = array(
                'projectName' => $projectName,
                'controllerName' => $controllerName,
                'controllerMethod'=> $controllerMethod,
                'controller'=> $controller,
                'param' => $param
            );
        }
        if (count($cgiArr) <= 0) {
            $this->resp->msg = $uri."解析异常";
            $this->jsonView->out($this->resp);
        }
        \view\Base::openCache();
        foreach ($cgiArr as $item) {
            $projectName = $item['projectName'];
            $controllerName = $item['controllerName'];
            $controllerMethod = $item['controllerMethod'];
            $controller = $item['controller'];
            //伪造get参数和登录用户
            $_GET = $item['param'];
            $controller->loginUserInfo = $this->loginUserInfo;
            $controller->loginUserRight = $this->loginUserRight;
            $controller->$controllerMethod();
        }
        $data = \view\Base::getCache();
        \view\Base::closeCache();
        $this->resp->data = $data;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }
}