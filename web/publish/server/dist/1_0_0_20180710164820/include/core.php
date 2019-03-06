<?php
$rootPath = preg_replace("/\\\\/", "/", __DIR__)."/../";
$configPath = $rootPath."config/";
$logPath = $rootPath."log/";
$staticPath = $rootPath."static/";
$externalPath = $rootPath."external/";
$modulePath = $rootPath."module/";
$filterPath = $rootPath."filter/";
$interceptorPath = $rootPath."interceptor/";
$controllerPath = $rootPath."controller/";
$servicePath = $rootPath."service/";
$daoPath = $rootPath."dao/";
$viewPath = $rootPath."view/";

function requireConfig($name, $configPath = null) {
    $name = preg_replace("/.*[\/\\\]/", "", $name);
    $name = preg_replace("/\\.json/", "", $name);
    if (empty($configPath)) {
        global $configPath;
    }
    $fileName = $configPath.$name.".json";
    $content = null;
    if (file_exists($fileName)) {
        $content = file_get_contents($fileName);
    } else {
        throw new Exception("没有找到 ".$name." 文件");
    }
    return $content;
}

function requireClass($name, $includePath, $namespace) {
    $name = preg_replace("/.*[\/\\\]/", "", $name);
    $name = preg_replace("/\\.php/", "", $name);
    $arr = explode("\\", $namespace);
    if (!is_array($arr) || count($arr) <= 0) {
        throw new Exception($namespace." 命名空间异常");
    }
    array_shift($arr);
    $namespacePath = '';
    if (count($arr) > 0) {
        $namespacePath = implode("/", $arr).'/';
    }
    $fileName = $includePath.$namespacePath.$name.".php";
    $className = $namespace."\\".$name;
    $class = null;
    if (is_null($GLOBALS['REQUIRE_CACHE'])) {
        $GLOBALS['REQUIRE_CACHE'] = array();
    }
    if (is_object($GLOBALS['REQUIRE_CACHE'][$className])) {
        return $GLOBALS['REQUIRE_CACHE'][$className];
    }
    if (!class_exists($className)) {
        if (file_exists($fileName)) {
            require_once($fileName);
        } else {
            throw new Exception("没有找到 ".$className." 类");
        }
    }
    if (class_exists($className)) {
        $class = new $className();
        //多例名单, 默认是单例
        $newInstanceArr = array(
            'module\Cache',
            'module\Database',
            'module\Message',
            'module\Resp'
        );
        //控制器都是多例
        if (!in_array($className, $newInstanceArr) && !preg_match('/^controller\\\\\w+/', $className)) {
            $GLOBALS['REQUIRE_CACHE'][$className] = $class;
        }
        if (method_exists($class, 'init')) {
            $class->init();
        }
        //非"module\\Resp"的每个类植入一个logger属性
        if ($className != "module\\Resp") {
            $class->logger = Logger::getLogger($className);
        }
    } else {
        throw new Exception("没有找到 ".$className." 类");
    }
    return $class;
}

function requireModule($name, $namespace = "module") {
    global $modulePath;
    return requireClass($name, $modulePath, $namespace);
}

function requireFilter($name, $namespace = "filter") {
    global $filterPath;
    return requireClass($name, $filterPath, $namespace);
}

function requireInterceptor($name, $namespace = "interceptor") {
    global $interceptorPath;
    return requireClass($name, $interceptorPath, $namespace);
}

function requireController($name, $namespace = "controller") {
    global $controllerPath;
    return requireClass($name, $controllerPath, $namespace);
}

function requireService($name, $namespace = "service") {
    global $servicePath;
    return requireClass($name, $servicePath, $namespace);
}

function requireDao($name, $namespace = "dao") {
    global $daoPath;
    return requireClass($name, $daoPath, $namespace);
}

function requireView($name, $namespace = "view") {
    global $viewPath;
    return requireClass($name, $viewPath, $namespace);
}

/********************** 执行入口 ************************/
$settingConfig = json_decode(requireConfig("setting.json"));
if (empty($settingConfig)) {
    echo "服务运行失败,系统配置文件有异常!";
    exit();
}
$curEnv = trim($settingConfig->env);
$curEnvConfig = $settingConfig->envConfig->$curEnv;

/********************** 配置log4php ************************/
include_once($externalPath."log4php/Logger.php");
$log4phpConfig = requireConfig("log4php.json");
$log4phpConfig = preg_replace("/#\\{path\\}/", $logPath, $log4phpConfig);
$log4phpConfig = preg_replace("/#\\{level\\}/", $curEnvConfig->logLevel, $log4phpConfig);
//false(默认)是以对象形式解析json, true是以数组形式解析json
$log4phpConfig = json_decode($log4phpConfig, true);
if (empty($log4phpConfig)) {
    echo "服务运行失败,日志配置文件有异常!";
    exit();
}
//log4php设置
Logger::configure($log4phpConfig);
$accessLogger = Logger::getLogger("access");

$runStartTime = null;
$runStopTime = null;
$runLogContent = null;
$runLogSeparator = "************************************************************************************************************************";

function runStart() {
    global $runStartTime, $runLogContent, $runLogSeparator;
    $runStartTime = microtime(true);
    $runLogContent = "";
    runLog($runLogSeparator);
}

function runLog($log) {
    global $runLogContent;
    if (!empty($log)) {
        $runLogContent .= "\r\n".$log;
    }
}

function runStop() {
    global $runStartTime, $runStopTime, $runLogContent, $runLogSeparator, $accessLogger;
    $runStopTime = microtime(true);
    $runTime = round(($runStopTime - $runStartTime)*1000, 2);
    runLog("耗时：".$runTime."毫秒");
    runLog($runLogSeparator);
    $accessLogger->info($runLogContent);
    exit();
}

/******************************* 挂载模块 ********************************/
requireController('Base');
requireService('Base');
requireView('Base');
require_once($modulePath.'Database.php');
\module\Database::setLogger();