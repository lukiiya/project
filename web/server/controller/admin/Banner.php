<?php
namespace controller\admin;
use controller\Base;

class Banner extends Base {
	private $common;
	private $resp;
	private $jsonView;
	private $commonService;
	private $bannerService;
	private $resourceService;
	public $loginUserInfo;
	public $loginUserRight;

    public function __construct() {
        $this->common = requireModule("Common");
        $this->resp = requireModule("Resp");
        $this->jsonView = requireView("Json");
        $this->commonService = requireService("Common");
        $this->bannerService = requireService("Banner");
        $this->resourceService = requireService("Resource");
    }

    //增加banner
    public function createBanner() {
        $file = $this->common->getParam("file", null);
        $type = (int)$this->common->getParam("type", 0);          //0=h5, 1=android, 2=ios
        $link = trim($this->common->getParam("link", ''));       //链接地址
        if (!is_array($file)) {
            $this->resp->msg = "file参数有误";
            $this->jsonView->out($this->resp);
        }
        if ($type < 0) {
            $this->resp->msg = "参数有误";
            $this->jsonView->out($this->resp);
        }
        if (empty($file['tmp_name'])) {
            $this->resp->msg = "请上传图片文件";
            $this->jsonView->out($this->resp);
        }
        $fileType = trim($file["type"]);
        $name = trim($file['name']);
        $tmpName = trim($file['tmp_name']);
        $error = (int)$file['error'];
        $size = (int)$file['size'];
        $maxSize = 2*1024*1024;//2MB
        if (empty($name) || empty($tmpName) || $error != 0 || $size <= 0 || $size > $maxSize || ($fileType != 'image/pjpeg' && $fileType != 'image/jpeg' && $fileType && 'image/png' && $fileType == 'image/x-png' &&  $fileType == 'image/gif')) {
            $this->resp->msg = "请上传正确的图片文件";
            $this->jsonView->out($this->resp);
        }
        $resourceId = 0;
        $pathInfo = pathinfo($name);
        $fileName = trim($pathInfo['filename']);
        $extension = trim($pathInfo['extension']);
        $respUpload = $this->saveUploadFile($tmpName, $fileName, $extension);
        if ($respUpload->errCode == 0) {
            if ((int)$respUpload->data > 0) {
                $resourceId =  (int)$respUpload->data;
            }
        }
        if ($resourceId <= 0) {
            $this->resp->msg = "图片上传有误";
            $this->jsonView->out($this->resp);
        }
        //开启事物
        $database = requireModule('Database');
        if ($database->execute('start transaction')) {
            //t_bannner表插入
            $insertBannerField = array();
            $insertBannerField[] = 'resourceId="' . $database->escape($resourceId) . '"';
            $insertBannerField[] = 'type="' . $database->escape($type) . '"';
            $insertBannerField[] = 'link="' . $database->escape($link) . '"';
            $insertBannerField[] = 'publish=0';
            $insertBannerField[] = 'createTime=now()';
            $insertBannerSql = 'insert into t_banner set ' . implode(',', $insertBannerField);
            $insertBannerResult = $database->execute($insertBannerSql);
            $insertBannerInsertId = (int)$database->getInsertId();
            if (!$insertBannerResult || $insertBannerInsertId <= 0) {
                $database->execute('rollback');
                $database->close();
                $this->resp->msg = "插入banner异常";
                $this->jsonView->out($this->resp);
            }
            //t_bannner表更新
            if ($insertBannerInsertId > 0) {
                $updateBannerSql = 'update t_banner set sort="' . $insertBannerInsertId . '" where bannerId="' . $insertBannerInsertId . '" and sort=0 limit 1 ';
                $updateBannerResult = $database->execute($updateBannerSql);
                $updateBannerAffectedRows = (int)$database->getAffectedRows();
                if (!$updateBannerResult || $updateBannerAffectedRows != 1) {
                    $database->execute('rollback');
                    $database->close();
                    $this->resp->msg = "更新banner异常";
                    $this->jsonView->out($this->resp);
                }
            }
            $database->execute('commit');
            $database->close();
            $this->resp->errCode = 0;
            $this->resp->msg = "banner添加成功";
            $this->jsonView->out($this->resp);
        } else {
            $this->resp->msg = "数据异常";
            $this->jsonView->out($this->resp);
        }
    }

    //banner编辑操作
    public function modifyBanner() {
        $bannerId = (int)$this->common->getParam("bannerId", 0);
        $file = $this->common->getParam("file", null);
        $type = $this->common->getParam("type", null);
        $link = trim($this->common->getParam("link", ''));
        if ($bannerId <= 0) {
            $this->resp->msg = "bannerId参数有误";
            $this->jsonView->out($this->resp);
        }
        //banner是否存在
        $selectBannerByIdResp = $this->bannerService->selectBannerById($bannerId);
        if ($selectBannerByIdResp->errCode != 0) {
            $this->resp->msg = "数据异常";
            $this->jsonView->out($this->resp);
        }
        $bannerData = $selectBannerByIdResp->data;
        if (empty($bannerData)) {
            $this->resp->msg = "数据异常";
            $this->jsonView->out($this->resp);
        }
        $resourceId = 0;
        //更新上传图片
        if (is_array($file) && !empty($file['tmp_name'])) {
            $fileType = trim($file["type"]);
            $name = trim($file['name']);
            $tmpName = trim($file['tmp_name']);
            $error = (int)$file['error'];
            $size = (int)$file['size'];
            $maxSize = 2*1024*1024;//2MB
            if ($error == 0 && $size > 0 && $size <= $maxSize && ($fileType == 'image/pjpeg' || $fileType == 'image/jpeg' || $fileType == 'image/png' || $fileType == 'image/x-png' ||  $fileType == 'image/gif')) {
                $pathInfo = pathinfo($name);
                $fileName = trim($pathInfo['filename']);
                $extension = trim($pathInfo['extension']);
                $respUpload = $this->saveUploadFile($tmpName, $fileName, $extension);
                if ($respUpload->errCode == 0) {
                    if ((int)$respUpload->data > 0) {
                        $resourceId =  (int)$respUpload->data;
                    }
                }
            }
        }
        $param = array();
        if ($resourceId > 0) {
            $param['resourceId'] = $resourceId;
        }
        if (!empty($link)) {
            $param['link'] = $link;
        }
        if ($type !== null) {
            $param['type'] = $type;
        }
        $param['bannerId'] = (int)$bannerId;
        $updateBannerResp = $this->bannerService->updateBanner($param);
        if ($updateBannerResp->errCode != 0) {
            $this->resp->msg = "数据异常";
            $this->jsonView->out($this->resp);
        }
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    //banner删除操作
    public function deleteBanner() {
        $bannerId = (int)$this->common->getParam("bannerId", 0);
        if ($bannerId <= 0) {
            $this->resp->msg = "bannerId参数有误";
            $this->jsonView->out($this->resp);
        }
        $selectBannerByIdResp = $this->bannerService->selectBannerById($bannerId);
        if ($selectBannerByIdResp->errCode != 0) {
            $this->resp->msg = "查询banner失败";
            $this->jsonView->out($this->resp);
        }
        $bannerData = $selectBannerByIdResp->data;
        if (empty($bannerData)) {
            $this->resp->msg = "数据异常";
            $this->jsonView->out($this->resp);
        }
        $deleteBannerResp = $this->bannerService->deleteBanner($bannerId);
        if ($deleteBannerResp->errCode != 0) {
            $this->resp->msg = "删除方案失败";
            $this->jsonView->out($this->resp);
        }
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    //banner上下架操作
    public function publishBanner() {
        $bannerId = (int)$this->common->getParam("bannerId", 0);
        $publish = (int)$this->common->getParam("publish", 0);
        if ($bannerId <= 0) {
            $this->resp->msg = "bannerId参数有误";
            $this->jsonView->out($this->resp);
        }
        $selectBannerByIdResp = $this->bannerService->selectBannerById($bannerId);
        if ($selectBannerByIdResp->errCode != 0) {
            $this->resp->msg = "查询banner失败";
            $this->jsonView->out($this->resp);
        }
        $bannerData = $selectBannerByIdResp->data;
        if (empty($bannerData)) {
            $this->resp->msg = "数据异常";
            $this->jsonView->out($this->resp);
        }
        $param = array();
        $param['bannerId'] = $bannerId;
        $param['publish'] = $publish;
        $updateBannerResp = $this->bannerService->updateBanner($param);
        if ($updateBannerResp->errCode != 0) {
            $this->resp->msg = "上下架banner失败";
            $this->jsonView->out($this->resp);
        }
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    //banner移动
    public function modifyBannerSort() {
        $bannerId = $this->common->getParam("bannerId", null);
        if (empty($bannerId)) {
            $this->resp->msg = "bannerId参数有误";
            $this->jsonView->out($this->resp);
        }
        $bannerId = $this->common->filterIdArray($bannerId);
        if (!is_array($bannerId) || count($bannerId) != 2) {
            $this->resp->msg = "bannerId参数有误";
            $this->jsonView->out($this->resp);
        }
        $param = array();
        $param['bannerId'] = $bannerId;
        $selectBanner = $this->bannerService->selectBanner($param);
        if ($selectBanner->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $bannerList = $selectBanner->data['list'];
        if (empty($bannerList)) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        if (count($bannerList) != 2) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        //开启事物
        $database = requireModule('Database');
        if ($database->execute('start transaction')) {
            $updateBannerField = 'sort="' . $database->escape($bannerList[0]['sort']) . '"';
            $updateBannerSql = 'update t_banner set ' . $updateBannerField .' where bannerId="' . $bannerList[1]['bannerId'] . '" limit 1';
            $updateBannerResult = $database->execute($updateBannerSql);
            $updateBannerAffectedRows = (int)$database->getAffectedRows();
            if (!$updateBannerResult || $updateBannerAffectedRows != 1) {
                $database->execute('rollback');
                $database->close();
                $this->resp->msg = "更新banner异常";
                $this->jsonView->out($this->resp);
            }
            $updateBannerField = 'sort="' . $database->escape($bannerList[1]['sort']) . '"';
            $updateBannerSql = 'update t_banner set ' . $updateBannerField . ' where bannerId="' .$bannerList[0]['bannerId'] . '" limit 1';
            $updateBannerResult = $database->execute($updateBannerSql);
            $updateBannerAffectedRows = (int)$database->getAffectedRows();
            if (!$updateBannerResult || $updateBannerAffectedRows != 1) {
                $database->execute('rollback');
                $database->close();
                $this->resp->msg = "更新banner异常";
                $this->jsonView->out($this->resp);
            }
            $database->execute('commit');
            $database->close();
            $this->resp->errCode = 0;
            $this->resp->msg = "移动成功";
            $this->jsonView->out($this->resp);
        } else {
            $this->resp->msg = "数据异常";
            $this->jsonView->out($this->resp);
        }
    }

    //banner列表
    public function bannerList() {
        $type = $this->common->getParam("type", null);
        $publish = $this->common->getParam("publish", null);
        $pageNum = (int)$this->common->getParam("pageNum", 0);
        $pageSize = (int)$this->common->getParam("pageSize", 0);
        if ($pageNum <= 0) {
            $pageNum = 1;
        }
        if ($pageSize <= 0) {
            $pageSize = 50;
        }
        if ($pageSize > 100) {
            $pageSize = 100;
        }
        $param = array();
        if ($type !== null) {
            $param['type'] = $type;
        }
        if ($publish !== null) {
            $param['publish'] = $publish;
        }
        $param['pageNum'] = $pageNum;
        $param['pageSize'] = $pageSize;
        $param['needCount'] = true;
        $selectBannerResp = $this->bannerService->selectBanner($param);
        if ($selectBannerResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $bannerListData = $selectBannerResp->data;
        $bannerList = $bannerListData['list'];
        $bannerList = $this->setBannerUrl($bannerList);
        $bannerListData['list'] = $bannerList;
        $this->resp->data = $bannerListData;
        $this->resp->errCode = 0;
        $this->resp->msg = "成功";
        $this->jsonView->out($this->resp);
    }

    //banner详情
    public function bannerInfo() {
        $bannerId = (int)$this->common->getParam("bannerId", 0);
        if ($bannerId <= 0) {
            $this->resp->msg = "bannerId参数有误";
            $this->jsonView->out($this->resp);
        }
        $selectBannerByIdResp = $this->bannerService->selectBannerById($bannerId);
        if ($selectBannerByIdResp->errCode != 0) {
            $this->resp->msg = "访问异常";
            $this->jsonView->out($this->resp);
        }
        $bannerData = $selectBannerByIdResp->data;
        $bannerData = $this->setBannerUrl(array($bannerData))[0];
        $this->resp->data = $bannerData;
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

    private function saveUploadFile($srcPath, $fileName, $extension) {
        $resp = requireModule("Resp");
        $srcPath = trim($srcPath);
        if (empty($srcPath)) {
            $resp->msg = 'srcPath参数有误';
            return $resp;
        }
        //资源表插入
        $param = array();
        $param['type'] = 1;
        $param['fileName'] = $fileName;
        $param['extension'] = $extension;
        $insertResourceResp = $this->resourceService->insertResource($param);
        if ($insertResourceResp->errCode != 0) {
            $resp->msg = "添加资源失败";
            return $resp;
        }
        $resourceId = (int)$insertResourceResp->data;
        if ($resourceId <= 0) {
            $resp->msg = "添加资源失败";
            return $resp;
        }
        $staticPath = '';
        global $curEnv;
        if ($curEnv == 'dev') {
            $staticPath = 'D:/develop/shaimi/code/web/server/portal/static/';
        } else if ($curEnv == 'beta') {
            $staticPath = '/yjdata/www/www/lvyou800/wx_test/cgi/static/';
        } else if ($curEnv == 'dist') {
            $staticPath = '/data/shaimi/cgi/static/';
        }
        if (empty($staticPath)) {
            $resp->msg = "保存banner路径有误";
            return $resp;
        }
        $destDir = $staticPath.'image/banner/';
        $destPath = $destDir.$resourceId.(empty($extension) ? '' : '.'.$extension);
        if (!is_dir($destDir)) {
            mkdir($destDir, 0700, true);
        }
        $result = move_uploaded_file($srcPath, $destPath);
        if (!$result) {
            $resp->msg = "上传错误";
            return $resp;
        }
        $resp->data = $resourceId;
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }
}