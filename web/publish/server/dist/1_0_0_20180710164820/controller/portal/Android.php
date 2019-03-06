<?php
namespace controller\portal;
use controller\Base;

class Android extends Base {
	private $common;
	private $resp;
	private $jsonView;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->resp = requireModule("Resp");
		$this->jsonView = requireView("Json");
	}

    public function publish() {
        $branch = (int)$this->common->getParam("branch", 0);//产品分支：0=晒米场, 1=晒米彩票, 2=晒米竞彩, 3=米多多彩票
        $source = (int)$this->common->getParam("source", 0);//来源, 0=h5, 1=android, 2=ios
        $version = trim($this->common->getParam("version", ''));
        if ($source != 1) {
            $this->resp->msg = 'source参数有误';
            $this->jsonView->out($this->resp);
        }
        $publish = 1;//0=未上架, 1=已上架
        if ($branch == 1) {
            if ($version == '2.6.0') {
                $publish = 0;
            }
        }
        $this->resp->data = $publish;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

}