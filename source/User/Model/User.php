<?php
class User{
    private static $instance = null;

    function __construct()
    {
        null;
    }

    public static function getInstance()
    {
        if (self::$instance == null)
        {
            self::$instance = new User();
        }

        return self::$instance;
    }


}


?>