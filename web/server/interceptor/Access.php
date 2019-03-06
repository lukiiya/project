<?php
namespace interceptor;
class Access {
	private $common;
    private $userService;
	private $adminUserService;
	
	public function __construct() {
		$this->common = requireModule("Common");
        $this->userService = requireService("User");
		$this->adminUserService = requireService("AdminUser");
	}

	public function execute() {
        $jsonView = requireView("Json");
		$resp = requireModule("Resp");
        $requestUri = trim($_SERVER['REQUEST_URI']);
        $parseRouteResp = $this->common->parseRoute($requestUri);
        if ($parseRouteResp->errCode != 0) {
            $resp->msg = $parseRouteResp->msg;
            $jsonView->out($resp);
        }
        $parseRouteData = $parseRouteResp->data;
        $projectName = $parseRouteData['projectName'];
        $controllerName = $parseRouteData['controllerName'];
        $controllerMethod = $parseRouteData['controllerMethod'];
        $controller = $parseRouteData['controller'];
        runLog("工程：".$projectName.", 控制器：".$controllerName.", 方法：".$controllerMethod);
        $userAuth = $this->common->getUserAuth($projectName);
        if ($projectName == 'portal') {
            if (!empty($userAuth)) {
                $loginUserId = (int)$userAuth['userId'];
                $loginUnionId = trim($userAuth['unionId']);
                if ($loginUserId > 0 && !empty($loginUnionId)) {
                    $selectUserByIdResp = $this->userService->selectUserById($loginUserId);
                    if ($selectUserByIdResp->errCode == 0) {
                        $user = $selectUserByIdResp->data;
                        $userId = (int)$user['userId'];
                        $unionId = trim($user['unionId']);
                        $phone = trim($user['phone']);
                        $userRight = (int)$user['userRight'];
                        if ($userId == $loginUserId) {
                            if ($loginUnionId == $unionId || ($this->common->verifyMobile($loginUnionId) && $this->common->verifyMobile($phone) && $loginUnionId == $phone)) {
                                $controller->loginUserInfo = $user;
                                $controller->loginUserRight = $this->common->getUserRight($userRight);
                            }
                        }
                    }
                }
            }
            $controller->$controllerMethod();
            return;
        } else if ($projectName == 'admin') {
            //登录和权限都不需要验证
            $white = array(
                '/p=admin&c=adminUser&m=adminUserLogin/i',
                '/p=admin&c=alipay&m=payNotify/i',
                '/p=admin&c=alipay&m=batchPayNotify/i'
            );
            foreach ($white as $item) {
                if (preg_match($item, $requestUri)) {
                    $controller->$controllerMethod();
                    return;
                }
            }
            if (empty($userAuth)) {
                $resp->errCode = 1;
                $resp->msg = "用户未登录";
                $jsonView->out($resp);
            }
            $loginUserId = (int)$userAuth['userId'];
            if ($loginUserId <= 0) {
                $resp->errCode = 1;
                $resp->msg = "用户未登录";
                $jsonView->out($resp);
            }
            $selectAdminUserByIdResp = $this->adminUserService->selectAdminUserById($loginUserId);
            if ($selectAdminUserByIdResp->errCode != 0) {
                $resp->errCode = 1;
                $resp->msg = "用户未登录";
                $jsonView->out($resp);
            }
            $adminUser = $selectAdminUserByIdResp->data;
            if (empty($adminUser)) {
                $resp->errCode = 1;
                $resp->msg = "用户未登录";
                $jsonView->out($resp);
            }
            $controller->loginUserInfo = $adminUser;
            $admin = (int)$adminUser['admin'];
            //系统管理员不需要验证权限
            if ($admin == 1) {
                $controller->$controllerMethod();
                return;
            }
            //权限不需要验证
            $grey = array(
                '/p=admin&c=adminUser&m=adminUserUnlogin/i',
                '/p=admin&c=adminUser&m=adminUserModifyPassword/i',
                '/p=admin&c=adminUser&m=adminUserInfo&needSelf=true/i',
                '/p=admin&c=adminUser&m=adminUserMenuList&needSelf=true/i'
            );
            foreach ($grey as $item) {
                if (preg_match($item, $requestUri)) {
                    $controller->$controllerMethod();
                    return;
                }
            }
            //权限验证
            $roleId = trim($adminUser['roleId']);
            $roleId = explode(',', $roleId);
            $roleId = $this->common->filterIdArray($roleId);
            if (!is_array($roleId) || count($roleId) <= 0) {
                $resp->msg = "未拥有任何角色";
                $jsonView->out($resp);
            }
            $param = array();
            $param['roleId'] = $roleId;
            $selectAdminUserRoleResp = $this->adminUserService->selectAdminUserRole($param);
            if ($selectAdminUserRoleResp->errCode != 0) {
                $resp->msg = "角色查询失败";
                $jsonView->out($resp);
            }
            $adminUserRoleList = $selectAdminUserRoleResp->data['list'];
            if (!is_array($adminUserRoleList) || count($adminUserRoleList) <= 0) {
                $resp->msg = "角色数据异常";
                $jsonView->out($resp);
            }
            $rightIdArr = array();
            foreach ($adminUserRoleList as $role) {
                $rightId = $this->common->filterIdArray(explode(',', trim($role['rightId'])));
                if (is_array($rightId) && count($rightId) > 0) {
                    $rightIdArr = array_merge($rightIdArr, $rightId);
                }
            }
            $rightIdArr = array_unique($rightIdArr);
            if (!is_array($rightIdArr) || count($rightIdArr) <= 0) {
                $resp->msg = "未拥有任何权限";
                $jsonView->out($resp);
            }
            $param = array();
            $param['rightId'] = $rightIdArr;
            $selectAdminUserRightResp = $this->adminUserService->selectAdminUserRight($param);
            if ($selectAdminUserRightResp->errCode != 0) {
                $resp->msg = "权限查询失败";
                $jsonView->out($resp);;
            }
            $adminUserRightList = $selectAdminUserRightResp->data['list'];
            if (!is_array($adminUserRightList) || count($adminUserRightList) <= 0) {
                $resp->msg = "权限数据异常";
                $jsonView->out($resp);
            }
            $pass = false;
            foreach ($adminUserRightList as $item) {
                $item = '/'.trim($item['rule']).'/i';
                if (preg_match($item, $requestUri)) {
                    $pass = true;
                }
            }
            if (!$pass) {
                $resp->msg = "没有权限访问";
                $jsonView->out($resp);
            }
            $controller->$controllerMethod();
            return;
        }
	}
}