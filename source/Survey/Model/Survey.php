<?php
class Survey{
    private static $instance = null;

    function __construct()
    {
        null;
    }

    public static function getInstance()
    {
        if (self::$instance == null)
        {
            self::$instance = new Survey();
        }

        return self::$instance;
    }


}


?>