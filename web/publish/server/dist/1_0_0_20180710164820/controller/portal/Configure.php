<?php
namespace controller\portal;
use controller\Base;

class Configure extends Base {
    private $common;
    private $resp;
    private $jsonView;
    private $commonService;

    public function __construct() {
        $this->common = requireModule("Common");
        $this->resp = requireModule("Resp");
        $this->jsonView = requireView("Json");
        $this->commonService = requireService("Common");
    }

    //版本设置
    public function setting() {
        $branch = (int)$this->common->getParam("branch", 0);//产品分支：0=晒米场, 1=晒米彩票, 2=晒米竞彩, 3=晒米彩票Pro(暂定)
        $source = (int)$this->common->getParam("source", 0);//来源, 0=h5, 1=android, 2=ios
        $version = trim($this->common->getParam("version", ''));//版本号
        $channel = (int)$this->common->getParam("channel", 0);//渠道
        $data = null;
        if ($branch == 0) {
            if ($source == 1) {
                $version = '3.7.1';
                $name = 'com.shaimii_'.$version.'.apk';
                $url = 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/other/android/com.shaimii_'.$version.'.apk';
                $description = "bug修复";
                $launchAd = array(
                    'src' => 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/other/android/launchAd.webp?'.$version.'.15',
                    'href' => ''
                );
                $launchAd = array();
                $size = 7465909;
                $data = array(
                    'version' => $version,
                    'name' => $name,
                    'url' => $url,
                    'description' => $description,
                    'launchAd' => $launchAd,
                    'source' => 0,//非0代表浏览器下载
                    'size' => $size
                );
            } else if ($source == 2) {
                $version = '2.6.0';
                $name = '';
                $url = 'https://www.pgyer.com/oZ9d';
                $description = '';
                $launchAd = array(
                    '@2x' => 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/other/ios/launchAd@2x.jpg?'.$version.'.9',
                    '@3x' => 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/other/ios/launchAd@3x.jpg?'.$version.'.9',
                    "@4x" => 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/other/ios/launchAd@4x.jpg?'.$version.'.9'
                );
                $publish = false;
                $sale = array('1' => true, '2' => false);
                $data = array(
                    'version' => $version,
                    'name' => $name,
                    'url' => $url,
                    'description' => $description,
                    'launchAd' => $launchAd,
                    'publish' => $publish,
                    'sale' => $sale,
                    'test' => false
                );
            }
        } else if ($branch == 1) {
            if ($source == 1) {
                $version = '2.6.1';
                $name = 'com.shaimii_jc_'.$version.'.apk';
                $url = 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/other/android/com.shaimii_jc_'.$version.'.apk';
                $description = "bug修复";
                $launchAd = array(
                    'src' => 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/other/android/launchAdJc.webp?'.$version.'.15',
                    'href' => ''
                );
                $launchAd = array();
                $size = 7527523;
                $data = array(
                    'version' => $version,
                    'name' => $name,
                    'url' => $url,
                    'description' => $description,
                    'launchAd' => $launchAd,
                    'source' => 0,//非0代表浏览器下载
                    'size' => $size
                );
            } else if ($source == 2) {
                $version = '2.5.0';
                $name = 'com.shaimii_'.$version.'.apk';
                $url = 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/other/android/com.shaimii_'.$version.'.apk';
                $description = '更新11111\n更新22222\n更新33333\n更新44444\n更新55555\n更新66666';
                $launchAd = array(
                    '@2x' => 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/other/ios/launchAdCp@2x.jpg?'.$version.'.17',
                    '@3x' => 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/other/ios/launchAdCp@3x.jpg?'.$version.'.17'
                );
                $launchAd = array();
                $publish = false;
                $sale = array('1' => true, '2' => false);
                $data = array(
                    'version' => $version,
                    'name' => $name,
                    'url' => $url,
                    'description' => $description,
                    'launchAd' => $launchAd,
                    'publish' => $publish,
                    'sale' => $sale,
                    'h5' => 'http://www.shaimii.com/#home'
                );
            }
        } else if ($branch == 2) {
            if ($source == 2) {
                $version = '2.5.0';
                $name = 'com.shaimii_'.$version.'.apk';
                $url = 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/other/android/com.shaimii_'.$version.'.apk';
                $description = '更新11111\n更新22222\n更新33333\n更新44444\n更新55555\n更新66666';
                $launchAd = array(
                    '@2x' => 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/other/ios/launchAdJc@2x.jpg?'.$version.'.17',
                    '@3x' => 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/other/ios/launchAdJc@3x.jpg?'.$version.'.17'
                );
                $launchAd = array();
                $publish = false;
                $sale = array('1' => true, '2' => false);
                $data = array(
                    'version' => $version,
                    'name' => $name,
                    'url' => $url,
                    'description' => $description,
                    'launchAd' => $launchAd,
                    'publish' => $publish,
                    'sale' => $sale
                );
            }
        }
        $this->resp->data = $data;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }
}
