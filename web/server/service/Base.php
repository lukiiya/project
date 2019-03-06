<?php
namespace service;
class Base {
    private $enabled = true;

	public function __construct() {

	}

	public function __call($name, $arguments) {
        preg_match('/^(\w+)(Static|Slave|Cache)$/', $name, $matches);
        if (!is_array($matches) || count($matches) != 3 || !method_exists($this, trim($matches[1]))) {
            throw new \Exception("没有找到 ".$name." 方法");
        }
        $method = trim($matches[1]);
        //控制器不能叫 static|slave|cache 名字, 忽略大小写
        if (preg_match('/^static$|^slave$|^cache$/i', $method)) {
            throw new \Exception($method." 是敏感关键词, 不能做service函数");
        }
        if (!$this->enabled) {
            return call_user_func_array(array($this, $method), $arguments);
        }
        $type = trim($matches[2]);
        $resp = requireModule('Resp');
        $keys = array();
        $keys[] = preg_replace("/\\\/", "_", get_class($this));
        $keys[] = $method;
        $keys[] = md5(json_encode($arguments));
        $cacheKey = implode('_', $keys);
        try {
            if ($type == 'Static') {
                global $staticPath;
                $fileName = $staticPath.'cache/'.$cacheKey;
                if (file_exists($fileName)) {
                    $content = null;
                    $handle = fopen($fileName, "r");
                    if ($handle) {
                        while (!feof($handle)) {
                            $content .= fgets($handle);
                        }
                        fclose($handle);
                    }
                    $content = json_decode($content, true);
                    if ($content !== null) {
                        $resp->data = $content;
                        $resp->errCode = 0;
                        $resp->msg = "成功";
                        return $resp;
                    } else {
                        $resp = call_user_func_array(array($this, $method), $arguments);
                        return $resp;
                    }
                } else {
                    \module\Database::openSlave();
                    try {
                        $resp = call_user_func_array(array($this, $method), $arguments);
                    } catch (\Exception $e) {

                    }
                    \module\Database::closeSlave();
                    if (!empty($resp) && ($resp instanceof \module\Resp) && $resp->errCode == 0) {
                        $handle = fopen($fileName, "w");
                        if ($handle) {
                            fwrite($handle, json_encode($resp->data));
                            fclose($handle);
                        }
                    }
                    return $resp;
                }
            } else if ($type == 'Slave') {
                \module\Database::openSlave();
                try {
                    $resp = call_user_func_array(array($this, $method), $arguments);
                } catch (\Exception $e) {

                }
                \module\Database::closeSlave();
                return $resp;
            } else if ($type == 'Cache') {
                $cache = requireModule('Cache');
                $getCacheResp = $cache->getCache($cacheKey);
                if ($getCacheResp->errCode == 0) {
                    $resp->data = $getCacheResp->data;
                    $resp->errCode = 0;
                    $resp->msg = "成功";
                    return $resp;
                }
                $resp = null;
                \module\Database::openSlave();
                try {
                    $resp = call_user_func_array(array($this, $method), $arguments);
                    if (!empty($resp) && ($resp instanceof \module\Resp) && $resp->errCode == 0) {
                        $cache->setCache($cacheKey, $resp->data);
                    }
                } catch (\Exception $e) {

                }
                \module\Database::closeSlave();
                return $resp;
            }
        } catch (\Exception $e) {
            $resp->msg = "访问异常";
            return $resp;
        }
	}
}