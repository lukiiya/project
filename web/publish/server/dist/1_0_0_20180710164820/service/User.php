<?php
namespace service;
class User extends Base {
	private $common;
	private $dao;
	
	public function __construct() {
		$this->common = requireModule("Common");
		$this->dao = requireDao("User");
	}

	public function insertUser($param) {
		$resp = requireModule("Resp");
		if (!is_array($param)) {
			$resp->msg = "参数有误";
			return $resp;
		}
		$unionId = trim($param['unionId']);
		if ($unionId == '') {
			$resp->msg = "unionId不能为空";
			return $resp;	
		}
		$insertUserResp = $this->dao->insertUser($param);
		if ($insertUserResp->errCode != 0) {
			$resp->msg = $insertUserResp->msg;
			return $resp;	
		}
		$resp->data = $insertUserResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function updateUser($param) {
		$resp = requireModule("Resp");
		if (!is_array($param)) {
			$resp->msg = "参数有误";
			return $resp;
		}
		$userId = (int)$param['userId'];
		if ($userId <= 0) {
			$resp->msg = "userId不能为空";
			return $resp;	
		}
		$updateUserResp = $this->dao->updateUser($param);
		if ($updateUserResp->errCode != 0) {
			$resp->msg = $updateUserResp->msg;
			return $resp;	
		}
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectUserById($param) {
		$resp = requireModule('Resp');
		$pass = false;
		if (is_numeric($param)) {
			$param = (int)$param;
			$pass = $param > 0;
		} else if (is_string($param)) {
			$param = trim($param);
			$pass = !empty($param);
		}
		if (!$pass) {
			$resp->msg = "参数有误";
			return $resp;
		}
		$selectUserByIdResp = $this->dao->selectUserById($param);
		if ($selectUserByIdResp->errCode != 0) {
			$resp->msg = $selectUserByIdResp->msg;
			return $resp;	
		}
		$resp->data = $selectUserByIdResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectUserByNo($userNo) {
		$resp = requireModule('Resp');
		$userNo = trim($userNo);
		if (empty($userNo)) {
			$resp->msg = 'userNo有误';
			return $resp;
		}
		$userNoArr = $this->common->decodeNo($userNo);
		$userNoUserId = (int)$userNoArr['userId'];
		$userNoId = (int)$userNoArr['id'];
		if (empty($userNoArr) || $userNoUserId <= 0 || $userNoId <= 0 || $userNoUserId != ($userNoId-12345678)) {
			$resp->msg = 'userNo参数有误';
			return $resp;
		}
		$selectUserByIdResp = $this->dao->selectUserById($userNoUserId);
		if ($selectUserByIdResp->errCode != 0) {
			$resp->msg = $selectUserByIdResp->msg;
			return $resp;
		}
		$resp->data = $selectUserByIdResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectUser($param) {
		$resp = requireModule('Resp');
		$selectUserResp = $this->dao->selectUser($param);
		if ($selectUserResp->errCode != 0) {
			$resp->msg = $selectUserResp->msg;
			return $resp;
		}
		$resp->data = $selectUserResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}
	
	public function insertUserVerify($param) {
		$resp = requireModule("Resp");
		if (!is_array($param)) {
			$resp->msg = "参数有误";
			return $resp;
		}
		$userId = trim($param['userId']);
		if ($userId <= 0) {
			$resp->msg = 'userId有误';
			return $resp;
		}
		$insertUserVerifyResp = $this->dao->insertUserVerify($param);
		if ($insertUserVerifyResp->errCode != 0) {
			$resp->msg = $insertUserVerifyResp->msg;
			return $resp;
		}
		$resp->data = $insertUserVerifyResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectUserVerifyById($verifyId) {
		$resp = requireModule('Resp');
		$verifyId = (int)$verifyId;
		if ($verifyId <= 0) {
			$resp->msg = 'verifyId有误';
			return $resp;
		}
		$selectUserVerifyByIdResp = $this->dao->selectUserVerifyById($verifyId);
		if ($selectUserVerifyByIdResp->errCode != 0) {
			$resp->msg = $selectUserVerifyByIdResp->msg;
			return $resp;
		}
		$resp->data = $selectUserVerifyByIdResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectUserVerify($param) {
		$resp = requireModule('Resp');
		$selectUserVerifyResp = $this->dao->selectUserVerify($param);
		if ($selectUserVerifyResp->errCode != 0) {
			$resp->msg = $selectUserVerifyResp->msg;
			return $resp;
		}
		$resp->data = $selectUserVerifyResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

    public function selectUserBindMobile($param) {
		$resp = requireModule('Resp');
        $selectUserBindMobileResp = $this->dao->selectUserBindMobile($param);
        if ($selectUserBindMobileResp->errCode != 0) {
            $resp->msg = $selectUserBindMobileResp->msg;
            return $resp;
        }
        $resp->data = $selectUserBindMobileResp->data;
        $resp->errCode = 0;
        $resp->msg = "成功";
		return $resp;
    }

    public function insertUserArticle($param) {
        $resp = requireModule("Resp");
        if (!is_array($param)) {
            $resp->msg = "参数有误";
            return $resp;
        }
        $userId = (int)$param['userId'];
        if ($userId <= 0) {
            $resp->msg = 'userId有误';
            return $resp;
        }
        $insertUserArticleResp = $this->dao->insertUserArticle($param);
        if ($insertUserArticleResp->errCode != 0) {
            $resp->msg = $insertUserArticleResp->msg;
            return $resp;
        }
        $resp->data = $insertUserArticleResp->data;
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

    public function selectUserArticle($param) {
		$resp = requireModule('Resp');
        $selectUserArticleResp = $this->dao->selectUserArticle($param);
        if ($selectUserArticleResp->errCode != 0) {
            $resp->msg = $selectUserArticleResp->msg;
            return $resp;
        }
        $resp->data = $selectUserArticleResp->data;
        $resp->errCode = 0;
        $resp->msg = "成功";
		return $resp;
    }

    public function updateUserArticle($param) {
        $resp = requireModule("Resp");
        if (!is_array($param)) {
            $resp->msg = "参数有误";
            return $resp;
        }
        $articleId = (int)$param['articleId'];
        if ($articleId <= 0) {
            $resp->msg = "articleId不能为空";
            return $resp;
        }
        $updateUserArticleResp = $this->dao->updateUserArticle($param);
        if ($updateUserArticleResp->errCode != 0) {
            $resp->msg = $updateUserArticleResp->msg;
            return $resp;
        }
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }
}