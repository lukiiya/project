<?php
namespace view;
class Text extends Base {
	public function out($data) {
        if (Base::isCache()) {
            Base::setCache($data);
            return;
        }
        header("Content-Type: text/plain; charset=utf-8");
        $text = "";
        if (is_numeric($data)) {
            $text = $data;
        } else if (is_string($data)) {
            $text = trim($data);
        } else if (is_object($data) || is_array($data)) {
            $text = json_encode($data);
        }
        echo $text;
        runStop();
	}
}