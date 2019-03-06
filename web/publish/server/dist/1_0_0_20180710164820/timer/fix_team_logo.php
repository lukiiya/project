#!/usr/local/php-7.0.7/bin/php -q
<?php
//方案算奖
set_time_limit(0);//设置脚本超时时间，为0时不受时间限制
date_default_timezone_set('PRC');
error_reporting(E_ALL ^ E_NOTICE);
include_once(__DIR__."/../include/core.php");

class TeamLogo {
    private $common;
    private $commonService;

    public function __construct() {
        $this->common = requireModule("Common");
        $this->commonService = requireService("Common");
    }

    public function execute() {
        $dir = './teamLogo/';
        $destDir = $dir.'md5/';
        if (!is_dir($destDir)) {
            mkdir($destDir, 0700, true);
        }
        foreach(scandir($dir) as $file) {
            $filePath = __DIR__.'/teamLogo/'.$file;
            if (!is_file($filePath)) {
                continue;
            }
            $name = preg_replace("/\\..*/", "", $file);
            $name = iconv('GBK', 'UTF-8', $name);
            file_put_contents($destDir.md5($name).'.jpg', file_get_contents($filePath));
        }
        echo '图标生成成功';
    }
}

//开始运行
$teamLogo = new TeamLogo();
$teamLogo->execute();