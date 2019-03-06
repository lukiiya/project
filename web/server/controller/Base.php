<?php
namespace controller;
class Base {
    private $enabled = true;

	public function __construct() {

	}

	public function __call($name, $arguments) {
        $type = null;
        if (method_exists($this, trim($name).'Static')) {
            $type = 'Static';
        } else if (method_exists($this, trim($name).'Slave')) {
            $type = 'Slave';
        } else if (method_exists($this, trim($name).'Cache')) {
            $type = 'Cache';
        }
        if (empty($type)) {
            throw new \Exception("没有找到 ".$name." 方法");
        }
        $method = trim($name).$type;
        if (!$this->enabled) {
            call_user_func_array(array($this, $method), $arguments);
            return;
        }
        $jsonView = requireView("Json");
        $resp = requireModule("Resp");
        $keys = array();
        $keys[] = preg_replace("/\\\/", "_", get_class($this));
        $keys[] = $method;
        $keys[] = md5(json_encode($arguments).json_encode($_GET).json_encode($_POST));
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
                        $jsonView->out($resp);
                    } else {
                        call_user_func_array(array($this, $method), $arguments);
                        return;
                    }
                } else {
                    \view\Base::openCache();
                    \module\Database::openSlave();
                    try {
                        call_user_func_array(array($this, $method), $arguments);
                    } catch (\Exception $e) {

                    }
                    \module\Database::closeSlave();
                    $cacheData = \view\Base::getCache();
                    \view\Base::closeCache();
                    if (!is_array($cacheData) || count($cacheData) <= 0 || empty($cacheData[0])) {
                        $resp->msg = "访问异常";
                        $jsonView->out($resp);
                    }
                    $resp = $cacheData[0];
                    if (!empty($resp) && ($resp instanceof \module\Resp) && $resp->errCode == 0) {
                        $handle = fopen($fileName, "w");
                        if ($handle) {
                            fwrite($handle, json_encode($resp->data));
                            fclose($handle);
                        }
                    }
                    $jsonView->out($resp);
                }
            } else if ($type == 'Slave') {
                \view\Base::openCache();
                \module\Database::openSlave();
                try {
                    call_user_func_array(array($this, $method), $arguments);
                } catch (\Exception $e) {

                }
                \module\Database::closeSlave();
                $cacheData = \view\Base::getCache();
                \view\Base::closeCache();
                if (!is_array($cacheData) || count($cacheData) <= 0 || empty($cacheData[0])) {
                    $resp->msg = "访问异常";
                    $jsonView->out($resp);
                }
                $resp = $cacheData[0];
                $jsonView->out($resp);
            } else if ($type == 'Cache') {
                $cache = requireModule('Cache');
                $getCacheResp = $cache->getCache($cacheKey);
                if ($getCacheResp->errCode == 0) {
                    $resp->data = $getCacheResp->data;
                    $resp->errCode = 0;
                    $resp->msg = "成功";
                    $jsonView->out($resp);
                }
                \view\Base::openCache();
                \module\Database::openSlave();
                try {
                    call_user_func_array(array($this, $method), $arguments);
                } catch (\Exception $e) {

                }
                \module\Database::closeSlave();
                $cacheData = \view\Base::getCache();
                \view\Base::closeCache();
                if (!is_array($cacheData) || count($cacheData) <= 0 || empty($cacheData[0])) {
                    $resp->msg = "访问异常";
                    $jsonView->out($resp);
                }
                $resp = $cacheData[0];
                if (!empty($resp) && ($resp instanceof \module\Resp) && $resp->errCode == 0) {
                    $cache->setCache($cacheKey, $resp->data);
                }
                $jsonView->out($resp);
            }
        } catch (\Exception $e) {
            throw $e;
        }
        return $resp;
	}
}