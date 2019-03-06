<?php
namespace view;
class Xml extends Base {
	public function out($data) {
        if (Base::isCache()) {
            Base::setCache($data);
            return;
        }
        header("Content-Type: text/xml; charset=utf-8");
        $xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>";
        $xml .= "<root>%s</root>";
        if (is_numeric($data)) {
            $xml = sprintf($xml, $data);
        } else if (is_string($data)) {
            $xml = sprintf($xml, trim($data));
        } else if (is_object($data) || is_array($data)) {
            $xml = sprintf($xml, json_encode($data));
        }
        echo $xml;
        runStop();
	}
}