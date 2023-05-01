<?php

require_once(dirname(__FILE__) . '/../../../Sender/Service/SenderService.php');

class TourSender extends \Main\SenderService
{

    private static $instance = null;

    function __construct() {
        parent::__construct();
    }

    public static function getInstance(){
        if (self::$instance == null) {
            self::$instance = new TourSender();
        }

        return self::$instance;
    }

    public function getAllTours(){
        $initialize_field = 'tours' ;
        return  $this->send_get_request($initialize_field, '');
    }

}

