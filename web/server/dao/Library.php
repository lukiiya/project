<?php
namespace dao;
class Library {
	private $common;
	
	public function __construct() {
		$this->common = requireModule("Common");
	}

	public function selectUnion($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$unionId = (int)$param['unionId'];
		$type = (int)$param['type'];
		$area = (int)$param['area'];
		$simplifiedName = trim($param['simplifiedName']);
		$traditionalName = trim($param['traditionalName']);
		$englishName = trim($param['englishName']);
		$caiKeUnionId = (int)$param['caiKeUnionId'];
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$needCount = (bool)$param['needCount'];
		$field = array();
		$field[] = 'discard=0';
		if ($unionId > 0) {
			$field[] = 'unionId="'.$unionId.'"';
		}
		if ($type > 0) {
			$field[] = 'type="'.$type.'"';
		}
		if ($area > 0) {
			$field[] = 'area="'.$area.'"';
		}
		if ($simplifiedName != '') {
			$field[] = 'simplifiedName like "%'.$database->escape($simplifiedName).'%"';
		}
		if ($traditionalName != '') {
			$field[] = 'traditionalName like "%'.$database->escape($traditionalName).'%"';
		}
		if ($englishName != '') {
			$field[] = 'englishName like "%'.$database->escape($englishName).'%"';
		}
		if ($caiKeUnionId > 0) {
			$field[] = 'caiKeUnionId="'.$caiKeUnionId.'"';
		}
		$field = implode(' and ', $field);
		$data = array("list" => array());
		if ($needCount) {
			$sql = 'select count(*) as totalCount from t_library_union where '.$field;
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
		$column = 'unionId,type,area,simplifiedName,traditionalName,englishName,logoImg,caiKeUnionId,createTime,lastTime';
		$sql = 'select '.$column.' from t_library_union where '.$field.' '.$page;
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

	public function selectLeague($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$leagueId = (int)$param['leagueId'];
		$type = (int)$param['type'];
		$unionId = (int)$param['unionId'];
		$simplifiedName = trim($param['simplifiedName']);
		$traditionalName = trim($param['traditionalName']);
		$englishName = trim($param['englishName']);
		$shortSimplifiedName = trim($param['shortSimplifiedName']);
		$shortTraditionalName = trim($param['shortTraditionalName']);
		$shortEnglishName = trim($param['shortEnglishName']);
		$caiKeLeagueId = (int)$param['caiKeLeagueId'];
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$needCount = (bool)$param['needCount'];
		$field = array();
		$field[] = 'discard=0';
		if ($leagueId > 0) {
			$field[] = 'leagueId="'.$leagueId.'"';
		}
		if ($type > 0) {
			$field[] = 'type="'.$type.'"';
		}
		if ($unionId > 0) {
			$field[] = 'unionId="'.$unionId.'"';
		}
		if ($simplifiedName != '') {
			$field[] = 'simplifiedName like "%'.$database->escape($simplifiedName).'%"';
		}
		if ($traditionalName != '') {
			$field[] = 'traditionalName like "%'.$database->escape($traditionalName).'%"';
		}
		if ($englishName != '') {
			$field[] = 'englishName like "%'.$database->escape($englishName).'%"';
		}
		if ($shortSimplifiedName != '') {
			$field[] = 'shortSimplifiedName like "%'.$database->escape($shortSimplifiedName).'%"';
		}
		if ($shortTraditionalName != '') {
			$field[] = 'shortTraditionalName like "%'.$database->escape($shortTraditionalName).'%"';
		}
		if ($shortEnglishName != '') {
			$field[] = 'shortEnglishName like "%'.$database->escape($shortEnglishName).'%"';
		}
		if ($caiKeLeagueId > 0) {
			$field[] = 'caiKeLeagueId="'.$caiKeLeagueId.'"';
		}
		$field = implode(' and ', $field);
		$data = array("list" => array());
		if ($needCount) {
			$sql = 'select count(*) as totalCount from t_library_league where '.$field;
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
		$column = 'leagueId,type,unionId,simplifiedName,traditionalName,englishName,shortSimplifiedName,shortTraditionalName,shortEnglishName,logoImg,caiKeLeagueId,createTime,lastTime';
		$sql = 'select '.$column.' from t_library_league where '.$field.' '.$page;
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

	public function selectTeam($param) {
		$resp = requireModule('Resp');
		$database = requireModule('Database');
		$teamId = (int)$param['teamId'];
		$type = (int)$param['type'];
		$leagueId = (int)$param['leagueId'];
		$simplifiedName = trim($param['simplifiedName']);
		$traditionalName = trim($param['traditionalName']);
		$englishName = trim($param['englishName']);
		$caiKeTeamId = (int)$param['caiKeTeamId'];
		$pageNum = (int)$param['pageNum'];
		$pageSize = (int)$param['pageSize'];
		$needCount = (bool)$param['needCount'];
		$field = array();
		$field[] = 'discard=0';
		if ($teamId > 0) {
			$field[] = 'teamId="'.$teamId.'"';
		}
		if ($type > 0) {
			$field[] = 'type="'.$type.'"';
		}
		if ($leagueId > 0) {
			$field[] = 'leagueId="'.$leagueId.'"';
		}
		if ($simplifiedName != '') {
			$field[] = 'simplifiedName like "%'.$database->escape($simplifiedName).'%"';
		}
		if ($traditionalName != '') {
			$field[] = 'traditionalName like "%'.$database->escape($traditionalName).'%"';
		}
		if ($englishName != '') {
			$field[] = 'englishName like "%'.$database->escape($englishName).'%"';
		}
		if ($caiKeTeamId > 0) {
			$field[] = 'caiKeTeamId="'.$caiKeTeamId.'"';
		}
		$field = implode(' and ', $field);
		$data = array("list" => array());
		if ($needCount) {
			$sql = 'select count(*) as totalCount from t_library_team where '.$field;
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
		$column = 'teamId,type,leagueId,simplifiedName,traditionalName,shortSimplifiedName,shortTraditionalName,shortEnglishName,englishName,logoImg,caiKeTeamId,createTime,lastTime';
		$sql = 'select '.$column.' from t_library_team where '.$field.' '.$page;
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
}