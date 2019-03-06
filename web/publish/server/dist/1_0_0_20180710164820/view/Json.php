<?php
namespace view;
class Json extends Base {
	public function out($data) {
        if (Base::isCache()) {
            Base::setCache($data);
            return;
        }
        header("Content-Type: application/json; charset=utf-8");
        $json = "";
        if (is_numeric($data)) {
            $json = $data;
        } else if (is_string($data)) {
            $json = trim($data);
        } else if (is_object($data) || is_array($data)) {
            $json = json_encode($data, JSON_UNESCAPED_UNICODE);
        }
        if (json_last_error() != JSON_ERROR_NONE) {
            $this->logger->info(json_last_error_msg());
        }
        echo $json;
        runStop();
	}
}