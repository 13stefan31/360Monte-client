<?php
class Report{
    private static $instance = null;

    function __construct()
    {
        null;
    }

    public static function getInstance()
    {
        if (self::$instance == null)
        {
            self::$instance = new Report();
        }

        return self::$instance;
    }


}


?>