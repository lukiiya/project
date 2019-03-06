<?php
namespace dao;
class Banner {
	private $common;
	public function __construct() {
		$this->common = requireModule("Common");
	}

	public function selectBanner($param) {
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        $bannerId = $param['bannerId'];
        $publish = (int)$param['publish'];
        $type = (int)$param['type'];
        $pageNum = (int)$param['pageNum'];
        $pageSize = (int)$param['pageSize'];
        $needCount = (bool)$param['needCount'];
        $field = array();
        $field[] = 'discard=0';
        if (is_numeric($bannerId)) {
            $bannerId = (int)$bannerId;
            if ($bannerId > 0) {
                $field[] = 'bannerId="'.$database->escape($bannerId).'"';
            }
        } else if (is_array($bannerId)) {
            $bannerId = $this->common->filterIdArray($bannerId);
            if (count($bannerId) > 0) {
                $bannerId = implode(',', $bannerId);
                $field[] = 'bannerId in('.$database->escape($bannerId).')';
            }
        }
        if (key_exists('publish', $param)) {
            $field[] = 'publish="'.$publish.'"';
        }
        if (key_exists('type', $param)) {
            $field[] = 'type="'.$type.'"';
        }
        $field = implode(' and ', $field);
        $data = array("list" => array());
        if ($needCount) {
            $sql = 'select count(*) as totalCount from t_banner where '.$field;
            $result = $database->execute($sql);
            if (!$result) {
                $database->close();
                $resp->msg = '查询失败';
                return $resp;
            }
            $info = $database->get($result);
            $database->free($result);
            $data['totalCount'] = (int)$info["totalCount"];
        }
        $page = '';
        if ($pageNum > 0 && $pageSize > 0) {
            $page = 'limit '.(($pageNum-1)*$pageSize).','.$pageSize;
        }
        $column = 'bannerId,resourceId,sort,type,link,publish,createTime,lastTime';
        $sql = 'select '.$column.' from t_banner where '.$field.' order by sort desc,bannerId desc '.$page;
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = '查询失败';
            return $resp;
        }
        while($info = $database->get($result)){
            $data['list'][] = $info;
        }
        $database->free($result);
        $database->close();
        $resp->data = $data;
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }

    public function selectBannerById($bannerId) {
        $resp = requireModule('Resp');
        $bannerId = (int)$bannerId;
        if ($bannerId <= 0) {
            $resp->msg = 'bannerId有误';
            return $resp;
        }
        $database = requireModule('Database');
        $field = 'bannerId="'.$database->escape($bannerId).'"';
        $column = 'bannerId,resourceId,sort,type,link,publish,createTime,lastTime';
        $sql = 'select '.$column.' from t_banner where discard=0 and '.$field.' limit 1';
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = '查询失败';
            return $resp;
        }
        $data = $database->get($result);
        $database->free($result);
        $database->close();
        $resp->data = $data;
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }

    public function updateBanner($param) {
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        $bannerId = (int)$param['bannerId'];
        $resourceId = (int)$param['resourceId'];
        $sort = (int)$param['sort'];
        $type = (int)$param['type'];
        $link = trim($param['link']);
        $publish = (int)$param['publish'];
        if ($bannerId <= 0) {
            $database->close();
            $resp->msg = 'bannerId不能为空';
            return $resp;
        }
        $field = array();
        if (key_exists('resourceId', $param)) {
            $field[] = 'resourceId="'.$database->escape($resourceId).'"';
        }
        if (key_exists('sort', $param)) {
            $field[] = 'sort="'.$database->escape($sort).'"';
        }
        if (key_exists('type', $param)) {
            $field[] = 'type="'.$database->escape($type).'"';
        }
        if (key_exists('link', $param)) {
            $field[] = 'link="'.$database->escape($link).'"';
        }
        if (key_exists('publish', $param)) {
            $field[] = 'publish="'.$database->escape($publish).'"';
        }
        if (count($field) == 0) {
            $database->close();
            $resp->msg = '字段不能为空';
            return $resp;
        }
        $sql = 'update t_banner set '.implode(',', $field).' where bannerId="'.$bannerId.'" limit 1';
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = '更新失败';
            return $resp;
        }
        $database->close();
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }

    public function deleteBanner($bannerId) {
        $resp = requireModule('Resp');
        $bannerId = (int)$bannerId;
        if ($bannerId <= 0) {
            $resp->msg = 'bannerId不能为空';
            return $resp;
        }
        $database = requireModule('Database');
        $sql = 'update t_banner set discard=1 where bannerId="'.$bannerId.'" limit 1';
        $result = $database->execute($sql);
        if (!$result) {
            $database->close();
            $resp->msg = '删除失败';
            return $resp;
        }
        $database->close();
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }

}