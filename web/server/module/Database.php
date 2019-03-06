<?php
namespace module;
class Database {
	private $master;
	private $config;
	private $mysql;
	public static $logger;

	public function __construct() {
		$connect = null;
		if (trim($GLOBALS['DATABASE_CONNECT']) === 'begin' || trim($GLOBALS['DATABASE_TRANSACTION']) === 'begin') {
			$connect = $GLOBALS['DATABASE_CACHE'];
		} else {
			$connect = self::open();
		}
		if (!self::checkConnect($connect)) {
			self::$logger->warn('数据库连接有误');
			exit();
		}
		$this->master = $connect['master'];
		$this->config = $connect['config'];
		$this->mysql = $connect['mysql'];
	}

	public static function setLogger() {
		self::$logger = \Logger::getLogger("module\\Database");
	}

	private static function open() {
		$master =  trim($GLOBALS['DATABASE_CONNECT']) === 'begin' || trim($GLOBALS['DATABASE_TRANSACTION']) === 'begin' || !(trim($GLOBALS['DATABASE_SLAVE']) === 'begin');
		global $curEnvConfig;
		$databaseArr = null;
		if ($master) {
			$databaseArr = $curEnvConfig->mysql->master;
		} else {
			$databaseArr = $curEnvConfig->mysql->slave;
		}
		$databasLength = count($databaseArr);
		if (!is_array($databaseArr) || $databasLength <= 0) {
			self::$logger->warn('数据库配置有误');
			exit();
		}
		$index = mt_rand(0, $databasLength - 1);
		$config = $databaseArr[$index];
		if (empty($config)) {
			self::$logger->warn('数据库配置有误');
			exit();
		}
		$mysql = new \mysqli($config->host, $config->user, $config->password, $config->database, $config->port);
		if ($mysql->connect_error) {
			self::$logger->warn($mysql->connect_error);
			exit();
		}
		$mysql->set_charset("utf8");
		$connect = array(
			'master' => $master,
			'config' => $config,
			'mysql' => $mysql
		);
		return $connect;
	}

	private static function checkConnect($connect) {
		if (empty($connect)) {
			return false;
		}
		$master = $connect['master'];
		$config = $connect['config'];
		$mysql = $connect['mysql'];
		if (($master !== true && $master !== false) || empty($config) || empty($mysql)) {
			return false;
		}
		return true;
	}

    public static function openSlave() {
        $GLOBALS['DATABASE_SLAVE'] = 'begin';
        return true;
    }

    public static function closeSlave() {
        $GLOBALS['DATABASE_SLAVE'] = null;
        return true;
    }

	public static function openConnect() {
		$GLOBALS['DATABASE_CONNECT'] = 'begin';
		$GLOBALS['DATABASE_CACHE'] = null;
		$connect = self::open();
		if (!self::checkConnect($connect)) {
			$GLOBALS['DATABASE_CONNECT'] = null;
			return false;
		}
		$GLOBALS['DATABASE_CACHE'] = $connect;
		return true;
	}

	public static function closeConnect() {
		if (!(trim($GLOBALS['DATABASE_CONNECT']) === 'begin')) {
			return false;
		}
		$connect = $GLOBALS['DATABASE_CACHE'];
		if (!self::checkConnect($connect)) {
			$GLOBALS['DATABASE_CONNECT'] = null;
			$GLOBALS['DATABASE_CACHE'] = null;
			return false;
		}
		$GLOBALS['DATABASE_CONNECT'] = null;
		$GLOBALS['DATABASE_CACHE'] = null;
		$mysql = $connect['mysql'];
		$mysql->close();
		return true;
	}

	public static function startTransaction() {
		$GLOBALS['DATABASE_TRANSACTION'] = 'begin';
		$GLOBALS['DATABASE_CACHE'] = null;
		$connect = self::open();
		if (!self::checkConnect($connect)) {
			$GLOBALS['DATABASE_TRANSACTION'] = null;
			return false;
		}
		$mysql = $connect['mysql'];
		$sql = 'start transaction';
		self::$logger->trace(self::description($connect).$sql);
		if (!$mysql->query($sql)) {
			$GLOBALS['DATABASE_TRANSACTION'] = null;
			$mysql->close();
			return false;
		}
		$GLOBALS['DATABASE_CACHE'] = $connect;
		return true;
	}

	public static function rollbackTransaction() {
		if (!(trim($GLOBALS['DATABASE_TRANSACTION']) === 'begin')) {
			return false;
		}
		$connect = $GLOBALS['DATABASE_CACHE'];
		if (!self::checkConnect($connect)) {
			$GLOBALS['DATABASE_TRANSACTION'] = null;
			$GLOBALS['DATABASE_CACHE'] = null;
			return false;
		}
		$mysql = $connect['mysql'];
		$sql = 'rollback';
		self::$logger->trace(self::description($connect).$sql);
		if (!$mysql->query($sql)) {
			$GLOBALS['DATABASE_TRANSACTION'] = null;
			$GLOBALS['DATABASE_CACHE'] = null;
			$mysql->close();
			return false;
		}
		$GLOBALS['DATABASE_TRANSACTION'] = null;
		$GLOBALS['DATABASE_CACHE'] = null;
		$mysql->close();
		return true;
	}

	public static function commitTransaction() {
		if (!(trim($GLOBALS['DATABASE_TRANSACTION']) === 'begin')) {
			return false;
		}
		$connect = $GLOBALS['DATABASE_CACHE'];
		if (!self::checkConnect($connect)) {
			$GLOBALS['DATABASE_TRANSACTION'] = null;
			$GLOBALS['DATABASE_CACHE'] = null;
			return false;
		}
		$mysql = $connect['mysql'];
		$sql = 'commit';
		self::$logger->trace(self::description($connect).$sql);
		if (!$mysql->query($sql)) {
			$GLOBALS['DATABASE_TRANSACTION'] = null;
			$GLOBALS['DATABASE_CACHE'] = null;
			$mysql->close();
			return false;
		}
		$GLOBALS['DATABASE_TRANSACTION'] = null;
		$GLOBALS['DATABASE_CACHE'] = null;
		$mysql->close();
		return true;
	}

	private static function description($connect) {
		$str = '';
		if (self::checkConnect($connect)) {
			$master = $connect['master'];
			$config = $connect['config'];
			$mysql = $connect['mysql'];
			$str = '['.$config->user.'@'.$config->host.'('.($master?'master':'slave').'):'.$config->port.':'.$mysql->thread_id .'] ';
		}
		return $str;
	}

	private function checkMysql() {
		return !(($this->master !== true && $this->master !== false) || empty($this->config) || empty($this->mysql) || empty($this->mysql->thread_id));
	}

	public function __toString() {
		$connect = array(
			'master' => $this->master,
			'config' => $this->config,
			'mysql' => $this->mysql
		);
		return self::description($connect);
	}

	public function __destruct() {

	}

	public function close() {
		if (trim($GLOBALS['DATABASE_CONNECT']) === 'begin' || trim($GLOBALS['DATABASE_TRANSACTION']) === 'begin') {
			return;
		}
		if ($this->checkMysql()) {
			$this->mysql->close();
		}
	}

	public function execute($sql) {
		$result = null;
		if ($this->checkMysql()) {
			$result = $this->mysql->query($sql);
			self::$logger->trace($this.$sql);
			if ($this->mysql->error) {
				self::$logger->warn($this.$sql);
				self::$logger->warn($this.$this->mysql->error);
			}
		}
		return $result;
	}

	public function multiExecute($sql) {
		$result = null;
		if ($this->checkMysql()) {
			$result = $this->mysql->multi_query($sql);
			self::$logger->trace($this.$sql);
			if ($this->mysql->error) {
				self::$logger->warn($this.$sql);
				self::$logger->warn($this.$this->mysql->error);
			}
		}
		return $result;
	}

	//防止注入
	public function escape($val) {
		if ($this->checkMysql()) {
			$val = $this->mysql->escape_string($val);
		}
		return $val;
	}

	//从结果集获取1行数据
	public function get($result) {
		$row = null;
		if ($result) {
			$row = mysqli_fetch_assoc($result);
		}
		return $row;
	}

	public function multiResult() {
		$resultArr = null;
		if ($this->checkMysql()) {
			$resultArr = array();
			do {
				$resultArr[] = $this->mysql->store_result();
			} while ($this->mysql->more_results() && $this->mysql->next_result());
		}
		return $resultArr;
	}

	//释放结果集内存
	public function free($result) {
		if ($result) {
			mysqli_free_result($result);
		}
	}


	public function multiFree() {
		if ($this->checkMysql()) {
			do {
				if ($result = $this->mysql->store_result()) {
					$result->free();
				}
			} while ($this->mysql->more_results() && $this->mysql->next_result());
		}
	}

	public function getInsertId() {
		$insertId = 0;
		if ($this->checkMysql()) {
			$insertId = $this->mysql->insert_id;
		}
		return $insertId;
	}

	public function multiInsertId() {
		$insertIdArr = null;
		if ($this->checkMysql()) {
			$insertIdArr = array();
			do {
				$insertIdArr[] = $this->mysql->insert_id;
			} while ($this->mysql->more_results() && $this->mysql->next_result());
		}
		return $insertIdArr;
	}

	public function getAffectedRows() {
		$affectedRows = 0;
		if ($this->checkMysql()) {
			$affectedRows = $this->mysql->affected_rows;
		}
		return $affectedRows;
	}

	public function multiAffectedRows() {
		$affectedRowsArr = null;
		if ($this->checkMysql()) {
			$affectedRowsArr = array();
			do {
				$affectedRowsArr[] = $this->mysql->affected_rows;
			} while ($this->mysql->more_results() && $this->mysql->next_result());
		}
		return $affectedRowsArr;
	}

	public function getNumRows($result) {
		$numRows = 0;
		if (!empty($result)) {
			$numRows = $result->num_rows;
		}
		return $numRows;
	}
}