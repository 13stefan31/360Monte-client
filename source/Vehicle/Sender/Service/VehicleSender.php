<?php

require_once(dirname(__FILE__) . '/../../../Sender/Service/SenderService.php');

class VehicleSender extends \Main\SenderService
{

    private static $instance = null;

    function __construct() {
        parent::__construct();
    }

    public static function getInstance(){
        if (self::$instance == null) {
            self::$instance = new VehicleSender();
        }

        return self::$instance;
    }

    public function getAllVehicles($brand=null,$model=null,$regNo=null,$status=null,$seatsNo=null,$limit,$page){
        $initialize_field = 'vehicles' ;

        $filters = array();
        if (!empty($brand)) {
            $filters[] = 'brand=' . urlencode($brand);
        }
        if (!empty($model)) {
            $filters[] = 'model=' . urlencode($model);
        }
        if (!empty($regNo)) {
            $filters[] = 'registration_number=' . urlencode($regNo);
        }
        if (!empty($status)) {
            $filters[] = 'readyToDrive=' . urlencode($status);
        }

        if (!empty($seatsNo)) {
            $filters[] = 'seats=' . urlencode($seatsNo);
        }
        if (!empty($limit)) {
            $filters[] = 'limit=' . urlencode($limit);
        }
        if (!empty($page)) {
            $filters[] = 'page=' . urlencode($page);
        }
        $filterString = implode('&', $filters);
        if (!empty($filterString)) {
            $initialize_field .= '?' . $filterString;
        }

        return  $this->send_get_request($initialize_field, '');
    }


    public function getSingleVehicle($id) {
        $initialize_field = 'vehicles' . '/' . $id;
        return  $this->send_get_request($initialize_field);

    }
}

