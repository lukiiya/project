<?php
namespace view;
class Html extends Base {
	public function out($data) {
        if (Base::isCache()) {
            Base::setCache($data);
            return;
        }
        header("Content-Type: text/html; charset=utf-8");
        $html = "<!doctype html>";
        $html .= "<html>";
        $html .= "<head>";
        $html .= "<meta charset=\"utf-8\">";
        $html .= "</head>";
        $html .= "<body>%s</body>";
        $html .= "</html>";
        if (is_numeric($data)) {
            $html = sprintf($html, $data);
        } else if (is_string($data)) {
            $html = sprintf($html, trim($data));
        } else if (is_object($data) || is_array($data)) {
            $html = sprintf($html, json_encode($data));
        }
        echo $html;
        runStop();
	}
}