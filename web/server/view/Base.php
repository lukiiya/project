<?php
namespace view;
class Base {

	public function __construct() {

	}

    public static function isCache() {
	    return is_array($GLOBALS['VIEW_CACHE']);
    }

    public static function getCache() {
        return $GLOBALS['VIEW_CACHE'];
    }

    public static function setCache($data) {
        if (self::isCache()) {
            if (is_string($data)) {
                $data = trim($data);
            }
            $GLOBALS['VIEW_CACHE'][] = $data;
        }
    }

    public static function openCache() {
        $GLOBALS['VIEW_CACHE'] = array();
    }

    public static function closeCache() {
        $GLOBALS['VIEW_CACHE'] = null;
    }
}