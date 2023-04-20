<?php
class Person{
    private static $instance = null;

    function __construct()
    {
        null;
    }

    public static function getInstance()
    {
        if (self::$instance == null)
        {
            self::$instance = new Person();
        }

        return self::$instance;
    }


}


?>