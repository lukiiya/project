<?php
namespace filter;
class Access {
	private $common;
	
	public function __construct() {
		$this->common = requireModule("Common");
	}

	public function execute() {
		//过滤 $_GET 和 $_POST
	}
}