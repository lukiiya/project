<?php
namespace service;
class Library extends Base {
	private $common;
	private $dao;

	public function __construct() {
		$this->common = requireModule("Common");
		$this->dao = requireDao("Library");
	}

	public function selectUnion($param) {
		$resp = requireModule('Resp');
		$selectUnionResp = $this->dao->selectUnion($param);
		if ($selectUnionResp->errCode != 0) {
			$resp->msg = $selectUnionResp->msg;
			return $resp;
		}
		$resp->data = $selectUnionResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectLeague($param) {
		$resp = requireModule('Resp');
		$selectLeagueResp = $this->dao->selectLeague($param);
		if ($selectLeagueResp->errCode != 0) {
			$resp->msg = $selectLeagueResp->msg;
			return $resp;
		}
		$resp->data = $selectLeagueResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectTeam($param) {
		$resp = requireModule('Resp');
		$selectTeamResp = $this->dao->selectTeam($param);
		if ($selectTeamResp->errCode != 0) {
			$resp->msg = $selectTeamResp->msg;
			return $resp;
		}
		$resp->data = $selectTeamResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}
}