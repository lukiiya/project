<?php
namespace dao;
class User {
	private $common;

	public function __construct() {
		$this->common = requireModule("Common");
	}
	
	public function insertUser($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$userRight = (int)$param['userRight'];
		$tag = trim($param['tag']);
		$nickName = trim($param['nickName']);
		$realName = trim($param['realName']);
		$sex = (int)$param['sex'];
		$country = trim($param['country']);
		$province = trim($param['province']);
		$city = trim($param['city']);
		$phone = trim($param['phone']);
		$openId = trim($param['openId']);
		$openOpenId = trim($param['openOpenId']);
		$openOpenIdJc = trim($param['openOpenIdJc']);
		$unionId = trim($param['unionId']);
		$address = trim($param['address']);
		$profileImg = trim($param['profileImg']);
		$personalImg = trim($param['personalImg']);
		$businessImg = trim($param['businessImg']);
		$remark = trim($param['remark']);
		$source = (int)$param['source'];
		$channel = (int)$param['channel'];
		$field = array();
		if (key_exists('userRight', $param)) {
			$field[] = 'userRight="'.$database->escape($userRight).'"';
		}
		if (key_exists('tag', $param)) {
			$field[] = 'tag="'.$database->escape($tag).'"';	
		}
		if (key_exists('nickName', $param)) {
			$field[] = 'nickName="'.$database->escape($nickName).'"';	
		}
		if (key_exists('realName', $param)) {
			$field[] = 'realName="'.$database->escape($realName).'"';	
		}
		if (key_exists('sex', $param)) {
			$field[] = 'sex="'.$database->escape($sex).'"';	
		}
		if (key_exists('country', $param)) {
			$field[] = 'country="'.$database->escape($country).'"';	
		}
		if (key_exists('province', $param)) {
			$field[] = 'province="'.$database->escape($province).'"';	
		}
		if (key_exists('city', $param)) {
			$field[] = 'city="'.$database->escape($city).'"';	
		}
		if (key_exists('phone', $param)) {
			$field[] = 'phone="'.$database->escape($phone).'"';	
		}
		if (key_exists('openId', $param)) {
			$field[] = 'openId="'.$database->escape($openId).'"';	
		}
		if (key_exists('openOpenId', $param)) {
			$field[] = 'openOpenId="'.$database->escape($openOpenId).'"';
		}
		if (key_exists('openOpenIdJc', $param)) {
			$field[] = 'openOpenIdJc="'.$database->escape($openOpenIdJc).'"';
		}
		if (key_exists('unionId', $param)) {
			$field[] = 'unionId="'.$database->escape($unionId).'"';
		}
		if (key_exists('address', $param)) {
			$field[] = 'address="'.$database->escape($address).'"';	
		}
		if (key_exists('profileImg', $param)) {
			$field[] = 'profileImg="'.$database->escape($profileImg).'"';	
		}
		if (key_exists('personalImg', $param)) {
			$field[] = 'personalImg="'.$database->escape($personalImg).'"';	
		}
		if (key_exists('businessImg', $param)) {
			$field[] = 'businessImg="'.$database->escape($businessImg).'"';	
		}
		if (key_exists('remark', $param)) {
			$field[] = 'remark="'.$database->escape($remark).'"';	
		}
		if (key_exists('source', $param)) {
			$field[] = 'source="'.$database->escape($source).'"';
		}
		if (key_exists('channel', $param)) {
			$field[] = 'channel="'.$database->escape($channel).'"';
		}
		$field[] = 'createTime=now()';
		if (count($field) == 0) {
			$database->close();
			$resp->msg = '字段不能为空';
			return $resp;	
		}
		$sql = 'insert into t_user set '.implode(',', $field);
		$result = $database->execute($sql);
		$insertId = 0;
		if (!$result || ($insertId = (int)$database->getInsertId()) <= 0) {
			$database->close();
			$resp->msg = '插入失败';
			return $resp;	
		}
		$database->close();
		$resp->data = $insertId;
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	public function updateUser($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$userId = (int)$param['userId'];
		$userRight = (int)$param['userRight'];
		$tag = trim($param['tag']);
		$nickName = trim($param['nickName']);
		$realName = trim($param['realName']);
		$sex = (int)$param['sex'];
		$country = trim($param['country']);
		$province = trim($param['province']);
		$city = trim($param['city']);
		$phone = trim($param['phone']);
		$openId = trim($param['openId']);
		$openOpenId = trim($param['openOpenId']);
		$openOpenIdJc = trim($param['openOpenIdJc']);
		$address = trim($param['address']);
		$profileImg = trim($param['profileImg']);
		$personalImg = trim($param['personalImg']);
		$businessImg = trim($param['businessImg']);
		$remark = trim($param['remark']);
		$spreaderUserId = trim($param['spreaderUserId']);
		$spreaderNickName = trim($param['spreaderNickName']);
		$spreaderRealName = trim($param['spreaderRealName']);
        $forbid = (int)$param['forbid'];
		if ($userId <= 0) {
			$database->close();
			$resp->msg = 'userId不能为空';
			return $resp;		
		}
		$field = array();
		if (key_exists('userRight', $param)) {
			$field[] = 'userRight="'.$database->escape($userRight).'"';
		}
		if (key_exists('tag', $param)) {
			$field[] = 'tag="'.$database->escape($tag).'"';	
		}
		if (key_exists('nickName', $param)) {
			$field[] = 'nickName="'.$database->escape($nickName).'"';	
		}
		if (key_exists('realName', $param)) {
			$field[] = 'realName="'.$database->escape($realName).'"';	
		}
		if (key_exists('sex', $param)) {
			$field[] = 'sex="'.$database->escape($sex).'"';	
		}
		if (key_exists('country', $param)) {
			$field[] = 'country="'.$database->escape($country).'"';	
		}
		if (key_exists('province', $param)) {
			$field[] = 'province="'.$database->escape($province).'"';	
		}
		if (key_exists('city', $param)) {
			$field[] = 'city="'.$database->escape($city).'"';
		}
		if (key_exists('phone', $param)) {
			$field[] = 'phone="'.$database->escape($phone).'"';
		}
		if (key_exists('openId', $param)) {
			$field[] = 'openId="'.$database->escape($openId).'"';
		}
		if (key_exists('openOpenId', $param)) {
			$field[] = 'openOpenId="'.$database->escape($openOpenId).'"';
		}
		if (key_exists('openOpenIdJc', $param)) {
			$field[] = 'openOpenIdJc="'.$database->escape($openOpenIdJc).'"';
		}
		if (key_exists('address', $param)) {
			$field[] = 'address="'.$database->escape($address).'"';	
		}
		if (key_exists('profileImg', $param)) {
			$field[] = 'profileImg="'.$database->escape($profileImg).'"';	
		}
		if (key_exists('personalImg', $param)) {
			$field[] = 'personalImg="'.$database->escape($personalImg).'"';	
		}
		if (key_exists('businessImg', $param)) {
			$field[] = 'businessImg="'.$database->escape($businessImg).'"';	
		}
		if (key_exists('remark', $param)) {
			$field[] = 'remark="'.$database->escape($remark).'"';	
		}
		if (key_exists('spreaderUserId', $param)) {
			$field[] = 'spreaderUserId="'.$database->escape($spreaderUserId).'"';
		}
		if (key_exists('spreaderNickName', $param)) {
			$field[] = 'spreaderNickName="'.$database->escape($spreaderNickName).'"';
		}
		if (key_exists('spreaderRealName', $param)) {
			$field[] = 'spreaderRealName="'.$database->escape($spreaderRealName).'"';
		}
        if (key_exists('forbid', $param)) {
            $field[] = 'forbid="'.$database->escape($forbid).'"';
        }
		if (count($field) == 0) {
			$database->close();
			$resp->msg = '字段不能为空';
			return $resp;	
		}
		$sql = 'update t_user set '.implode(',', $field).' where userId="'.$userId.'" limit 1';
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

	public function selectUserById($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$field = '';
		if (is_numeric($param)) {
			$field = 'userId="'.$database->escape($param).'"';	
		} else if (is_string($param)) {
			$field = 'unionId="'.$database->escape($param).'"';
		} else {
			$database->close();
			$resp->msg = '传参有误';
			return $resp;	
		}
		$column = 'userId,userRight,tag,nickName,realName,sex,country,province,city,phone,openId,openOpenId,openOpenIdJc,unionId,subscribe,address,profileImg,personalImg,identityImg,businessImg,remark,spreaderUserId,spreaderNickName,spreaderRealName,forbid,source,channel,createTime,lastTime';
		$sql = 'select '.$column.' from t_user where discard=0 and '.$field.' limit 1';
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

	public function selectUser($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$userId = $param['userId'];
		$userName = trim($param['userName']);
		$phone = trim($param['phone']);
		$userRight = (int)$param['userRight'];
		$openId = trim($param['openId']);
		$unionId = trim($param['unionId']);
		$subscribe = (int)$param['subscribe'];
		$spreaderUserId = (int)$param['spreaderUserId'];
		$hasOpenId = (bool)$param['hasOpenId'];
        $forbid = (int)$param['forbid'];
		$source = (int)$param['source'];
		$channel = $param['channel'];
		$needPhone = (bool)$param['needPhone'];
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$needCount = (bool)$param['needCount'];
		$justCount = (bool)$param['justCount'];
		$field = array();
		$field[] = 'discard=0';
		if (is_numeric($userId)) {
			$userId = (int)$userId;
			if ($userId > 0) {
				$field[] = 'userId="'.$database->escape($userId).'"';
			}
		} else if (is_array($userId)) {
			$userId = $this->common->filterIdArray($userId);
			if (count($userId) > 0) {
				$userId = implode(',', $userId);
				$field[] = 'userId in('.$database->escape($userId).')';
			}
		}
		if ($userName != '') {
			$field[] = '(nickName like "%'.$database->escape($userName).'%" or realName like "%'.$database->escape($userName).'%")';
		}
		if ($phone != '') {
			$field[] = 'phone="'.$database->escape($phone).'"';
		}
		if (key_exists('userRight', $param)) {
			$field[] = 'userRight="'.$database->escape($userRight).'"';
		}
		if ($openId != '') {
			$field[] = 'openId="'.$database->escape($openId).'"';
		}
		if (key_exists('unionId', $param)) {
			$field[] = 'unionId="'.$database->escape($unionId).'"';
		}
		if (key_exists('subscribe', $param)) {
			$field[] = 'subscribe="'.$database->escape($subscribe).'"';
		}
		if ($spreaderUserId > 0) {
			$field[] = 'spreaderUserId="'.$spreaderUserId.'"';
		}
		if ($hasOpenId) {
			$field[] = 'openId!=""';
		}
        if (key_exists('forbid', $param)) {
            $field[] = 'forbid="'.$database->escape($forbid).'"';
        }
		if (key_exists('source', $param)) {
			$field[] = 'source="'.$database->escape($source).'"';
		}
		if (key_exists('channel', $param)) {
			if (is_numeric($channel)) {
				$field[] = 'channel="'.$database->escape($channel).'"';
			} else if (is_array($channel)) {
				$channel = $this->common->filterNumArray($channel);
				$channel = implode(',', $channel);
				$field[] = 'channel in('.$database->escape($channel).')';
			}
		}
		if ($needPhone) {
			$field[] = 'phone!=""';
		}
		$field = implode(' and ', $field);
		$data = array();
		if ($needCount || $justCount) {
			$sql = 'select count(*) as totalCount from t_user where '.$field;
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
		if (!$justCount) {
			$page = '';
			if ($pageNum > 0 && $pageSize > 0) {
				$page = 'limit '.(($pageNum-1)*$pageSize).','.$pageSize;
			}
			$column = 'userId,userRight,tag,nickName,realName,sex,country,province,city,phone,openId,openOpenId,openOpenIdJc,unionId,subscribe,address,profileImg,personalImg,identityImg,businessImg,remark,spreaderUserId,spreaderNickName,spreaderRealName,forbid,source,channel,createTime,lastTime';
			$sql = 'select '.$column.' from t_user where '.$field.' order by userId desc '.$page;
			$result = $database->execute($sql);
			if (!$result) {
				$database->close();
				$resp->msg = '查询失败';
				return $resp;
			}
			$data['list'] = array();
			while($info = $database->get($result)){
				$data['list'][] = $info;
			}
			$database->free($result);
		}
		$database->close();
		$resp->data = $data;
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	public function insertUserVerify($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$userId = (int)$param['userId'];
		$nickName = trim($param['nickName']);
		$realName = trim($param['realName']);
		$type = (int)$param['type'];
		$phone = trim($param['phone']);
		$personalImg = $param['personalImg'];
		$identityImg = $param['identityImg'];
		$businessImg = $param['businessImg'];
		$address = trim($param['address']);
		$remark = trim($param['remark']);
		$status = (int)$param['status'];
		$field = array();
		if (key_exists('userId', $param)) {
			$field[] = 'userId="'.$database->escape($userId).'"';
		}
		if (key_exists('nickName', $param)) {
			$field[] = 'nickName="'.$database->escape($nickName).'"';
		}
		if (key_exists('realName', $param)) {
			$field[] = 'realName="'.$database->escape($realName).'"';
		}
		if (key_exists('type', $param)) {
			$field[] = 'type="'.$database->escape($type).'"';
		}
		if (key_exists('phone', $param)) {
			$field[] = 'phone="'.$database->escape($phone).'"';
		}
		if (key_exists('personalImg', $param)) {
			if (is_array($personalImg)) {
				$field[] = 'personalImg="'.$database->escape(implode(',', $this->common->filterIdArray($personalImg))).'"';
			} else if (is_string($personalImg)) {
				$field[] = 'personalImg="'.$database->escape($personalImg).'"';
			}
		}
		if (key_exists('identityImg', $param)) {
			if (is_array($identityImg)) {
				$field[] = 'identityImg="'.$database->escape(implode(',', $this->common->filterIdArray($identityImg))).'"';
			} else if (is_string($identityImg)) {
				$field[] = 'identityImg="'.$database->escape($identityImg).'"';
			}
		}
		if (key_exists('businessImg', $param)) {
			if (is_array($businessImg)) {
				$field[] = 'businessImg="'.$database->escape(implode(',', $this->common->filterIdArray($businessImg))).'"';
			} else if (is_string($businessImg)) {
				$field[] = 'businessImg="'.$database->escape($businessImg).'"';
			}
		}
		if (key_exists('address', $param)) {
			$field[] = 'address="'.$database->escape($address).'"';
		}
		if (key_exists('remark', $param)) {
			$field[] = 'remark="'.$database->escape($remark).'"';
		}
		if (key_exists('status', $param)) {
			$field[] = 'status="'.$database->escape($status).'"';
		}
		$field[] = 'createTime=now()';
		if (count($field) == 0) {
			$database->close();
			$resp->msg = '字段不能为空';
			return $resp;
		}
		$sql = 'insert into t_user_verify set '.implode(',', $field);
		$result = $database->execute($sql);
		$insertId = 0;
		if (!$result || ($insertId = (int)$database->getInsertId()) <= 0) {
			$database->close();
			$resp->msg = '插入失败';
			return $resp;
		}
		$database->close();
		$resp->data = $insertId;
		$resp->errCode = 0;
		$resp->msg = '成功';
		return $resp;
	}

	public function selectUserVerifyById($verifyId) {
		$resp = requireModule('Resp');
		$verifyId = (int)$verifyId;
		if ($verifyId <= 0) {
			$resp->msg = 'verifyId有误';
			return $resp;
		}
		$database = requireModule('Database');
		$field = 'verifyId="'.$database->escape($verifyId).'"';
		$column = 'verifyId,userId,nickName,realName,type,phone,personalImg,identityImg,businessImg,address,remark,status,createTime,lastTime';
		$sql = 'select '.$column.' from t_user_verify where discard=0 and '.$field.' limit 1';
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

	public function selectUserVerify($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$userId = (int)$param['userId'];
		$userName = trim($param['userName']);
		$type = (int)$param['type'];
		$status = (int)$param['status'];
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$needCount = (bool)$param['needCount'];
		$field = array();
		$field[] = 'discard=0';
		if ($userId > 0) {
			$field[] = 'userId="'.$userId.'"';
		}
		if ($userName != '') {
			$field[] = '(nickName like "%'.$database->escape($userName).'%" or realName like "%'.$database->escape($userName).'%")';
		}
		if ($type > 0) {
			$field[] = 'type="'.$type.'"';
		}
		if ($status > 0) {
			$field[] = 'status="'.$status.'"';
		}
		$field = implode(' and ', $field);
		$data = array("list" => array());
		if ($needCount) {
			$sql = 'select count(*) as totalCount from t_user_verify where '.$field;
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
		$column = 'verifyId,userId,nickName,realName,type,phone,personalImg,identityImg,businessImg,address,remark,status,createTime,lastTime';
		$sql = 'select '.$column.' from t_user_verify where '.$field.' order by verifyId desc '.$page;
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

    public function selectUserBindMobile($param) {
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        $bindId = (int)$param['bindId'];
        $userId = (int)$param['userId'];
        $mobile = trim($param['mobile']);
        $pageNum = (int)$param['pageNum'];
        $pageSize = (int)$param['pageSize'];
        $needCount = (bool)$param['needCount'];
        $field = array();
        $field[] = 'discard=0';
        if ($bindId > 0) {
            $field[] = 'bindId="'.$bindId.'"';
        }
        if ($userId > 0) {
            $field[] = 'userId="'.$userId.'"';
        }
        if ($mobile != '') {
            $field[] = 'mobile="'.$mobile.'"';
        }
        $field = implode(' and ', $field);
        $data = array("list" => array());
        if ($needCount) {
            $sql = 'select count(*) as  totalCount from t_user_bind_mobile where '.$field;
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
        $orderBy = 'order by bindId desc';
        $sql = 'select bindId,userId,nickName,realName,mobile,presentAmount,createTime,lastTime from t_user_bind_mobile where '.$field.' '.$orderBy.' '.$page;
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

    public function insertUserArticle($param) {
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        $userId = (int)$param['userId'];
        $nickName = trim($param['nickName']);
        $realName = trim($param['realName']);
        $articleTitle = trim($param['articleTitle']);
        $articleSource = trim($param['articleSource']);
        $articleImg = trim($param['articleImg']);
        $articleLink = trim($param['articleLink']);
        if (key_exists('userId', $param)) {
            $field[] = 'userId="'.$database->escape($userId).'"';
        }
        if (key_exists('nickName', $param)) {
            $field[] = 'nickName="'.$database->escape($nickName).'"';
        }
        if (key_exists('realName', $param)) {
            $field[] = 'realName="'.$database->escape($realName).'"';
        }
        if (key_exists('articleTitle', $param)) {
            $field[] = 'articleTitle="'.$database->escape($articleTitle).'"';
        }
        if (key_exists('articleSource', $param)) {
            $field[] = 'articleSource="'.$database->escape($articleSource).'"';
        }
        if (key_exists('articleImg', $param)) {
            $field[] = 'articleImg="'.$database->escape($articleImg).'"';
        }
        if (key_exists('articleLink', $param)) {
            $field[] = 'articleLink="'.$database->escape($articleLink).'"';
        }
        $field[] = 'createTime=now()';
        if (count($field) == 0) {
            $database->close();
            $resp->msg = '字段不能为空';
            return $resp;
        }
        $sql = 'insert into t_user_article set '.implode(',', $field);
        $result = $database->execute($sql);
        $insertId = 0;
        if (!$result || ($insertId = (int)$database->getInsertId()) <= 0) {
            $database->close();
            $resp->msg = '插入失败';
            return $resp;
        }
        $database->close();
        $resp->data = $insertId;
        $resp->errCode = 0;
        $resp->msg = '成功';
        return $resp;
    }

    public function selectUserArticle($param) {
        $resp = requireModule('Resp');
        $database = requireModule('Database');
		$articleId = (int)$param['articleId'];
        $userId = (int)$param['userId'];
        $userName = trim($param['userName']);
        $articleTitle = trim($param['articleTitle']);
        $articleSource = trim($param['articleSource']);
        $articleImg = trim($param['articleImg']);
        $articleLink = trim($param['articleLink']);
        $pageNum = (int)$param['pageNum'];
        $pageSize = (int)$param['pageSize'];
        $needCount = (bool)$param['needCount'];
        $field = array();
        $field[] = 'discard=0';
		if ($articleId > 0) {
			$field[] = 'articleId="'.$database->escape($articleId).'"';
		}
        if (is_numeric($userId)) {
            $userId = (int)$userId;
            if ($userId > 0) {
                $field[] = 'userId="'.$database->escape($userId).'"';
            }
        } else if (is_array($userId)) {
            $userId = $this->common->filterIdArray($userId);
            if (count($userId) > 0) {
                $userId = implode(',', $userId);
                $field[] = 'userId in('.$database->escape($userId).')';
            }
        }
        if ($userName != '') {
            $field[] = '(nickName like "%'.$database->escape($userName).'%" or realName like "%'.$database->escape($userName).'%")';
        }
        if ($articleTitle != '') {
            $field[] = 'articleTitle like "%'.$database->escape($articleTitle).'%"';
        }
        if ($articleSource != '') {
            $field[] = 'articleSource="'.$database->escape($articleSource).'"';
        }
        if ($articleImg != '') {
            $field[] = 'articleImg="'.$database->escape($articleImg).'"';
        }
        if ($articleLink != '') {
            $field[] = 'articleLink="'.$database->escape($articleLink).'"';
        }
        $field = implode(' and ', $field);
        $data = array("list" => array());
        if ($needCount) {
            $sql = 'select count(*) as totalCount from t_user_article where '.$field;
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
        $orderBy = 'order by createTime desc';
        $sql = 'select articleId,userId,nickName,realName,articleTitle,articleSource,articleImg,articleLink,createTime,lastTime from t_user_article where '.$field.' '.$orderBy.' '.$page;
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

    public function updateUserArticle($param) {
        $resp = requireModule('Resp');
        $database = requireModule('Database');
        $articleId = (int)$param['articleId'];
        $userId = (int)$param['userId'];
        $nickName = trim($param['nickName']);
        $realName = trim($param['realName']);
        $articleTitle = trim($param['articleTitle']);
        $articleSource = trim($param['articleSource']);
        $articleImg = trim($param['articleImg']);
        $articleLink = trim($param['articleLink']);
        $discard = (int)$param['discard'];
        if ($articleId <= 0) {
            $database->close();
            $resp->msg = 'articleId不能为空';
            return $resp;
        }
        $field = array();
        if (key_exists('userId', $param)) {
            $field[] = 'userId="'.$database->escape($userId).'"';
        }
        if (key_exists('nickName', $param)) {
            $field[] = 'nickName="'.$database->escape($nickName).'"';
        }
        if (key_exists('realName', $param)) {
            $field[] = 'realName="'.$database->escape($realName).'"';
        }
        if (key_exists('articleTitle', $param)) {
            $field[] = 'articleTitle="'.$database->escape($articleTitle).'"';
        }
        if (key_exists('articleSource', $param)) {
            $field[] = 'articleSource="'.$database->escape($articleSource).'"';
        }
        if (key_exists('articleImg', $param)) {
            $field[] = 'articleImg="'.$database->escape($articleImg).'"';
        }
        if (key_exists('articleLink', $param)) {
            $field[] = 'articleLink="'.$database->escape($articleLink).'"';
        }
        if (key_exists('discard', $param)) {
            $field[] = 'discard="'.$database->escape($discard).'"';
        }
        if (count($field) == 0) {
            $database->close();
            $resp->msg = '字段不能为空';
            return $resp;
        }
        $sql = 'update t_user_article set '.implode(',', $field).' where articleId="'.$articleId.'" limit 1';
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
}