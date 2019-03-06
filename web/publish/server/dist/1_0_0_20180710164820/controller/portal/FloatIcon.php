<?php
namespace controller\portal;
use controller\Base;

class FloatIcon extends Base {
	private $common;
	private $resp;
	private $jsonView;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->resp = requireModule("Resp");
		$this->jsonView = requireView("Json");
	}

	//悬浮图标
    public function floatIconInfo() {
        $source = (int)$this->common->getSource();//来源, 0=h5, 1=android, 2=ios
        $branch = (int)$this->common->getParam("branch", 0);//产品分支：0=晒米场, 1=晒米彩票, 2=晒米竞彩, 3=晒米彩票Pro(暂定)
        $channel = (int)$this->common->getParam("channel", 0);
        $version = trim($this->common->getParam("version", ''));
        global $curEnv;
        $src = 'http://caifu-1251177394.cosgz.myqcloud.com/beta/shaimi/img/floatIcon/floatIcon1.png?1';
        $href = 'http://beta.shaimii.com/#activity/rechargeSend';
        if ($curEnv == 'dist') {
            $src = 'http://caifu-1251177394.cosgz.myqcloud.com/dist/shaimi/img/floatIcon/floatIcon4.png?2';
            $href = 'http://www.shaimii.com/#activity/ttqhb';
        }
        $data = array(
            "src" => $src,
            "href" => $href,
            "width" => 180,
            "height" => 202
        );
        $this->resp->data = null;
        $this->resp->errCode = -1;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }
}