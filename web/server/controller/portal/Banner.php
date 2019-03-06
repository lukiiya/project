<?php
namespace controller\portal;
use controller\Base;

class Banner extends Base {
	private $common;
	private $resp;
	private $jsonView;
	private $commonService;
	private $userService;
	private $resourceService;
	private $bannerService;
	public $loginUserInfo;
	public $loginUserRight;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->resp = requireModule("Resp");
		$this->jsonView = requireView("Json");
		$this->commonService = requireService("Common");
		$this->userService = requireService("User");
		$this->resourceService = requireService("Resource");
		$this->bannerService = requireService("Banner");
	}

	//得到套餐列表
	public function bannerList() {
		$source = (int)$this->common->getSource();//来源, 0=h5, 1=android, 2=ios
		$branch = (int)$this->common->getParam("branch", 0);//产品分支：0=晒米场, 1=晒米彩票, 2=晒米竞彩, 3=晒米彩票Pro(暂定)
		$version = trim($this->common->getParam("version", ''));
		if (trim($_GET['source']) == 'ios') {
			$this->jsonView->out('{"errCode":0,"msg":"成功","data":{"list":[{"src":"http:\/\/www.800ly.net\/wx_test\/cgi\/static\/image\/banner\/7118.jpg","href":"https:\/\/mp.weixin.qq.com\/s\/K7ZaUeai7kFpu9MeC1RPvQ"}]}}');
		}
		$param = array();
		$param['type'] = $source;
		$param['publish'] = 1;
		$param['pageNum'] = 1;
		$param['pageSize'] = 50;
		$param['needCount'] = false;
		$selectBannerResp = $this->bannerService->selectBanner($param);
		if ($selectBannerResp->errCode != 0) {
			$this->resp->msg = "访问异常";
			$this->jsonView->out($this->resp);
		}
		$bannerList = $selectBannerResp->data['list'];
		$bannerList = $this->setBannerUrl($bannerList);
		$data = array('list' => array());
		foreach ($bannerList as $banner) {
			$bannerId = (int)$banner['bannerId'];
			$resourceList = $banner['resourceList'];
			$publish = (int)$banner['publish'];
			$src = trim($resourceList[0]);
			$href = trim($banner['link']);
			if ($bannerId <= 0 || !is_array($resourceList) || count($resourceList) <= 0 || $publish != 1 || empty($src) || empty($href)) {
				continue;
			}
			if ($source == 2) {
				if ($branch == 2 && $version == '2.3.3') {
					$href = preg_replace('/shaimi:\/\/jxzpList/', "http://www.shaimii.com/#jxzpList?", $href);
				}
				if ($branch != 2 || $version != '2.3.3') {
					$urlArr = array(
						'shaimi://jxzpList',
						'http://www.shaimii.com/#jxzpList?'
					);
					if (!in_array($href, $urlArr)) {
						//continue;
					}
				}
			}
			$bannerInfo = array();
			$bannerInfo['src'] = $src;
			$bannerInfo['href'] = $href;
			$data['list'][] = $bannerInfo;
		}
		$this->resp->data = $data;
		$this->resp->errCode = 0;
		$this->resp->msg = "成功";
		$this->jsonView->out($this->resp);
	}

	private function setBannerUrl($objectList, $key = 'resourceId') {
		if (!is_array($objectList) || count($objectList) <= 0) {
			return $objectList;
		}
		$resourceIdArr = array();
		foreach ($objectList as $object) {
			$resourceId = trim($object[$key]);
			if (empty($resourceId)) {
				continue;
			}
			$resourceId = explode(',', $resourceId);
			if (is_array($resourceId) && count($resourceId) > 0) {
				$resourceIdArr = array_merge($resourceIdArr, $resourceId);
			}
		}
		$resourceList = array();
		if (count($resourceIdArr) > 0) {
			$param = array();
			$param['type'] = 1;
			$param['resourceId'] = $resourceIdArr;
			$param['pageNum'] = 1;
			$param['pageSize'] = 200;
			$selectResourceResp = $this->resourceService->selectResource($param);
			if ($selectResourceResp->errCode == 0 && !empty($selectResourceResp->data['list'])) {
				$resourceList = $selectResourceResp->data['list'];
			}
		}
		$resourceMap = array();
		foreach ($resourceList as $resource) {
			$resourceId = (int)$resource['resourceId'];
			if ($resourceId > 0) {
				$resourceMap[$resourceId] = $resource;
			}
		}
		global $curEnvConfig;
		$resourceUrl = trim($curEnvConfig->resourceUrl);
		for ($i = 0, $length = count($objectList); $i < $length; $i++) {
			$resourceId = trim($objectList[$i][$key]);
			$resourceId = explode(',', $resourceId);
			if (!empty($resourceId) && is_array($resourceId) && count($resourceId) > 0) {
				$resourceUrlList = array();
				foreach ($resourceId as $id) {
					if (!empty($resourceMap[$id])) {
						$extension = trim($resourceMap[$id]['extension']);
						$url = trim($resourceMap[$id]['url']);
						if (empty($url)) {
							$url = $resourceUrl.'image/banner/'.$id;
							if (!empty($extension)) {
								$url .= '.'.$extension;
							}
						}
						$resourceUrlList[] = $url;
					}
				}
				$objectList[$i]['resourceList'] = $resourceUrlList;
			}
		}
		return $objectList;
	}
}