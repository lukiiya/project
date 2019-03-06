<?php
namespace module;
class Cache {
    private $redis;

	public function __construct() {
        global $curEnvConfig;
        $redisConfig = $curEnvConfig->redis;
        $this->redis = new \Redis();
        $this->redis->pconnect($redisConfig->host, $redisConfig->port);
        $this->redis->auth($redisConfig->password);
        $this->redis->setOption(\Redis::OPT_READ_TIMEOUT, -1);
	}

	public function getCache($cacheKey) {
		$resp = requireModule('Resp');
		$cacheKey = trim($cacheKey);
		if (empty($this->redis)) {
			$resp->msg = 'redis无效';
			return $resp;
		}
		if (empty($cacheKey)) {
			$resp->msg = 'cacheKey无效';
			return $resp;
		}
		$data = null;
		try {
			$cache = json_decode($this->redis->get($cacheKey), true);
            if (empty($cache)) {
                $resp->msg = '缓存不存在';
                return $resp;
            }
            $time = (int)$cache['time'];
            $timeout = (int)$cache['timeout'];
            $curTime = time();
            if ($curTime - $time > $timeout) {
                $resp->msg = '缓存已经失效';
                return $resp;
            }
            $data = $cache['data'];
            global $curEnv;
            if ($curEnv == 'dev') {
                $this->logger->trace("读取缓存 [".$cacheKey."]");
            }
		} catch (RedisException $e) {
			$this->logger->warn($e->getMessage());
			$resp->msg = $e->getMessage();
			return $resp;
		}
		$resp->data = $data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function setCache($cacheKey, $data, $timeout = 10 * 60) {
		$resp = requireModule('Resp');
		$cacheKey = trim($cacheKey);
		if (empty($this->redis)) {
			$resp->msg = 'redis无效';
			return $resp;
		}
		if (empty($cacheKey)) {
			$resp->msg = 'cacheKey无效';
			return $resp;
		}
		$cache = array(
			"data" => $data,
			"time"  => time(),
			"timeout"  => $timeout
		);
		try {
			$this->redis->set($cacheKey, json_encode($cache), $timeout);
			global $curEnv;
			if ($curEnv == 'dev') {
				$this->logger->trace("设置缓存 [".$cacheKey."]");
			}
		} catch (RedisException $e) {
			$this->logger->warn($e->getMessage());
			$resp->msg = $e->getMessage();
			return $resp;
		}
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function clearCache($cacheKey = '') {
		$resp = requireModule('Resp');
		$cacheKey = trim($cacheKey);
		if (empty($this->redis)) {
			$resp->msg = 'redis无效';
			return $resp;
		}
		$keys = $this->redis->keys('*');
		if (is_array($keys) && count($keys) > 0) {
			foreach ($keys as $key) {
				if (empty($cacheKey) || strpos($key, $cacheKey) !== false) {
					$this->redis->del($key);
				}
			}
		}
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function getKeys() {
		$resp = requireModule('Resp');
		if (empty($this->redis)) {
			$resp->msg = 'redis无效';
			return $resp;
		}
		$keys = $this->redis->keys('*');
		$resp->data = $keys;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}
}