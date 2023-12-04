<?php
class DailyData{
    private static $instance = null;

    function __construct()
    {
        null;
    }

    public static function getInstance()
    {
        if (self::$instance == null)
        {
            self::$instance = new DailyData();
        }

        return self::$instance;
    }


}


?>