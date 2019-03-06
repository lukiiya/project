<?php
namespace controller\portal;
use controller\Base;

class VerificationCode extends Base {
    private $charset = 'abcdefghkmnprstuvwxyzABCDEFGHKMNPRSTUVWXYZ23456789';//随机因子
    private $code; //验证码
    private $codeLength = 4; //验证码长度
    private $width = 130; //宽度
    private $height = 50; //高度
    private $img; //图形资源句柄
    private $font = './static/file/RosewoodStd-Regular.otf'; //指定的字体
    private $fontSize = 30; //指定字体大小
    private $fontColor; //指定字体颜色
    //构造方法初始化
    public function __construct() {
        $this->common = requireModule("Common");
    }

    //生成随机码
    private function createCode() {
        $len = strlen($this->charset);
        for ($i = 0; $i < $this->codeLength; $i++) {
            $this->code .= $this->charset[mt_rand(0, $len - 1)];
        }
    }

    //生成背景
    private function createBg() {
        $this->img = imagecreatetruecolor($this->width, $this->height);
        $color = imagecolorallocate($this->img, mt_rand(157, 255), mt_rand(157, 255), mt_rand(157, 255));
        imagefilledrectangle($this->img, 0, $this->height, $this->width, 0, $color);
    }

    //生成文字
    private function createFont() {
        $x = $this->width / $this->codeLength;
        for ($i = 0; $i < $this->codeLength; $i++) {
            $this->fontColor = imagecolorallocate($this->img, mt_rand(0, 156), mt_rand(0, 156), mt_rand(0, 156));
            imagettftext($this->img, $this->fontSize, mt_rand(-30, 30), $x*$i+mt_rand(1, 5), $this->height/1.4, $this->fontColor, $this->font, $this->code[$i]);
        }
    }

    //生成线条、雪花
    private function createLine() {
        //线条
        for ($i = 0; $i < 6; $i++) {
            $color = imagecolorallocate($this->img, mt_rand(0, 156), mt_rand(0, 156), mt_rand(0, 156));
            imageline($this->img, mt_rand(0, $this->width), mt_rand(0, $this->height), mt_rand(0, $this->width), mt_rand(0, $this->height), $color);
        }
        //雪花
        for ($i = 0; $i < 100; $i++) {
            $color = imagecolorallocate($this->img, mt_rand(200,255), mt_rand(200,255), mt_rand(200,255));
            imagestring($this->img, mt_rand(1, 5), mt_rand(0, $this->width), mt_rand(0, $this->height), '*', $color);
        }
    }

    //输出
    private function outPut() {
        header('Content-type:image/png');
        imagepng($this->img);
        imagedestroy($this->img);
    }

    //对外生成验证码，设置cookie
    public function image() {
        //开启缓存
        ob_start();
        $this->createBg();
        $this->createCode();
        $this->createLine();
        $this->createFont();
        $this->outPut();
        $this->common->setVerificationCode($this->code);
        ob_end_flush();
    }
}