<?php
namespace service;
class Ticket extends Base {
	private $common;
	private $dao;
	
	public function __construct() {
		$this->common = requireModule("Common");
		$this->dao = requireDao("Ticket");
	}

	public function selectTicketById($ticketId) {
		$resp = requireModule('Resp');
		$ticketId = (int)$ticketId;
		if ($ticketId <= 0) {
			$resp->msg = 'ticketId有误';
			return $resp;
		}
		$selectTicketByIdResp = $this->dao->selectTicketById($ticketId);
		if ($selectTicketByIdResp->errCode != 0) {
			$resp->msg = $selectTicketByIdResp->msg;
			return $resp;	
		}
		$resp->data = $selectTicketByIdResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}

	public function selectTicket($param) {
		$resp = requireModule('Resp');
		$selectTicketResp = $this->dao->selectTicket($param);
		if ($selectTicketResp->errCode != 0) {
			$resp->msg = $selectTicketResp->msg;
			return $resp;
		}
		$resp->data = $selectTicketResp->data;
		$resp->errCode = 0;
		$resp->msg = "成功";
		return $resp;
	}
}