<?php
namespace module;
class Message {
	private $common;
	private $redis;

	public function __construct() {
		$this->common = requireModule("Common");
		global $curEnvConfig;
		$redisConfig = $curEnvConfig->redis;
		$this->redis = new \Redis();
		$this->redis->pconnect($redisConfig->host, $redisConfig->port);
		$this->redis->auth($redisConfig->password);
		$this->redis->setOption(\Redis::OPT_READ_TIMEOUT, -1);
	}

	public function subscribe($channels, $callback) {
		if (!empty($this->redis) || !empty($channels) || !empty($callback)) {
			$this->redis->subscribe($channels, $callback);
		}
	}

	public function publish($channel, $message) {
		$result = null;
		if (!empty($this->redis) || !empty($channel) || !empty($message)) {
			$result = $this->redis->publish($channel, $message);
		}
		return $result;
	}
}