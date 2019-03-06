<?php
namespace module;
class Resp {
	//版本
	//public $version;
	//来源
	//public $source;
	//错误码 0=成功, !0=失败
	public $errCode = -1;
	//描述
	public $msg;
	//返回数据
	public $data;

	function __construct() {
		$this->data = new \stdClass();
	}
}
