<?php
namespace service;
class Match extends Base {
	private $common;
	private $dao;
	
	public function __construct() {
		$this->common = requireModule("Common");
		$this->dao = requireDao("Match");
	}

	public function insertMatch($param) {
		$resp = requireModule("Resp");
		$insertMatchResp = $this->dao->insertMatch($param);
		if ($insertMatchResp->errCode != 0) {
			$resp->msg = $insertMatchResp->msg;
			return $resp;	
		}
		$resp->data = $insertMatchResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function updateMatch($param) {
		$resp = requireModule("Resp");
		$updateMatchResp = $this->dao->updateMatch($param);
		if ($updateMatchResp->errCode != 0) {
			$resp->msg = $updateMatchResp->msg;
			return $resp;
		}
		$resp->data = $updateMatchResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectMatchById($matchId) {
		$resp = requireModule('Resp');
		$matchId = (int)$matchId;
		if ($matchId <= 0) {
			$resp->msg = 'matchId有误';
			return $resp;
		}
		$selectMatchByIdResp = $this->dao->selectMatchById($matchId);
		if ($selectMatchByIdResp->errCode != 0) {
			$resp->msg = $selectMatchByIdResp->msg;
			return $resp;	
		}
		$resp->data = $selectMatchByIdResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectMatch($param) {
		$resp = requireModule('Resp');
		$selectMatchResp = $this->dao->selectMatch($param);
		if ($selectMatchResp->errCode != 0) {
			$resp->msg = $selectMatchResp->msg;
			return $resp;
		}
		$resp->data = $selectMatchResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectMatchLeague($param) {
		$resp = requireModule('Resp');
		$selectMatchLeagueResp = $this->dao->selectMatchLeague($param);
		if ($selectMatchLeagueResp->errCode != 0) {
			$resp->msg = $selectMatchLeagueResp->msg;
			return $resp;
		}
		$resp->data = $selectMatchLeagueResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectMatchOddsById($oddsId) {
		$resp = requireModule('Resp');
		$oddsId = (int)$oddsId;
		if ($oddsId <= 0) {
			$resp->msg = 'oddsId有误';
			return $resp;
		}
		$selectMatchOddsByIdResp = $this->dao->selectMatchOddsById($oddsId);
		if ($selectMatchOddsByIdResp->errCode != 0) {
			$resp->msg = $selectMatchOddsByIdResp->msg;
			return $resp;
		}
		$resp->data = $selectMatchOddsByIdResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectMatchOdds($param) {
		$resp = requireModule('Resp');
		$selectMatchOddsResp = $this->dao->selectMatchOdds($param);
		if ($selectMatchOddsResp->errCode != 0) {
			$resp->msg = $selectMatchOddsResp->msg;
			return $resp;
		}
		$resp->data = $selectMatchOddsResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectMatchBettype($param) {
		$resp = requireModule('Resp');
		$selectMatchBettypeResp = $this->dao->selectMatchBettype($param);
		if ($selectMatchBettypeResp->errCode != 0) {
			$resp->msg = $selectMatchBettypeResp->msg;
			return $resp;
		}
		$resp->data = $selectMatchBettypeResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

    public function selectGuessOdds($param) {
        $resp = requireModule('Resp');
        $selectGuessOddsResp = $this->dao->selectGuessOdds($param);
        if ($selectGuessOddsResp->errCode != 0) {
            $resp->msg = $selectGuessOddsResp->msg;
            return $resp;
        }
        $resp->data = $selectGuessOddsResp->data;
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

    public function selectAdditionalMatch($param) {
        $resp = requireModule('Resp');
        $selectAdditionalMatchResp = $this->dao->selectAdditionalMatch($param);
        if ($selectAdditionalMatchResp->errCode != 0) {
            $resp->msg = $selectAdditionalMatchResp->msg;
            return $resp;
        }
        $resp->data = $selectAdditionalMatchResp->data;
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

    public function selectAdditionalMatchOdds($param) {
        $resp = requireModule('Resp');
        $selectAdditionalMatchOddsResp = $this->dao->selectAdditionalMatchOdds($param);
        if ($selectAdditionalMatchOddsResp->errCode != 0) {
            $resp->msg = $selectAdditionalMatchOddsResp->msg;
            return $resp;
        }
        $resp->data = $selectAdditionalMatchOddsResp->data;
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }

    public function selectAdditionalTeamScore($param) {
        $resp = requireModule('Resp');
        $selectAdditionalTeamScoreResp = $this->dao->selectAdditionalTeamScore($param);
        if ($selectAdditionalTeamScoreResp->errCode != 0) {
            $resp->msg = $selectAdditionalTeamScoreResp->msg;
            return $resp;
        }
        $resp->data = $selectAdditionalTeamScoreResp->data;
        $resp->errCode = 0;
        $resp->msg = "成功";
        return $resp;
    }
}