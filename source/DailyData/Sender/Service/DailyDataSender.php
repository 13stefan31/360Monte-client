<?php

require_once(dirname(__FILE__) . '/../../../Sender/Service/SenderService.php');

class DailyDataSender extends \Main\SenderService
{

    private static $instance = null;

    function __construct() {
        parent::__construct();
    }

    public static function getInstance(){
        if (self::$instance == null) {
            self::$instance = new DailyDataSender();
        }

        return self::$instance;
    }

    public function getDailyData($vehicleId = null,$date=null, $limit,$page){
        $initialize_field = 'vehicle-daily-data' ;
        $filters = array();
        if (!empty($vehicleId)) {
            $filters[] = 'vehicleId=' . urlencode($vehicleId);
        }
        if (!empty($date)) {
            $filters[] = 'date=' . $date;
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
        return  $this->send_get_request($initialize_field);
    }

    public function getCartData($vehicleId = null,$date=null){
        $initialize_field = 'vehicle-daily-data/vehicle/'.$vehicleId.'/chart' ;
        if (!empty($date)) {
            $filters[] = 'date=' . urlencode($date);
        }
        $filterString = implode('&', $filters);
        if (!empty($filterString)) {
            $initialize_field .= '?' . $filterString;
        }
        return  $this->send_get_request($initialize_field);
    }
    public function getSingleDailyData($id) {
        $initialize_field = 'vehicle-daily-data' . '/' . $id;
        return  $this->send_get_request($initialize_field);
    }
    public function deleteDailyData($id) {
        $initialize_field = 'vehicle-daily-data' . '/' . $id;
        return  $this->send_delete_request($initialize_field);
    }

    public function updateDailyData($data){

        $body = [
            'fuelPrice' => $data['fuelPrice'],
            'fuelQuantity' => $data['fuelQuantity'],
            'driverId' => $data['driverId'],
        ];

        $initialize_field = 'vehicle-daily-data/'.$data['dataId'];
        return  $this->send_put_request($initialize_field, $body);

    }

//    public function addDailyData($data){
//        $date = isset($data['date']) ? DateTime::createFromFormat('Y-m-d', $data['date'])->format('d.m.Y') : null;
//
//        $body = [
//            'vehicleId' => $data['vehicleId'],
//            'driverId' => $data['driverId'],
//            'startingMileage' => $data['startingMileage'],
//            'endingMileage' => $data['endingMileage'],
//            'fuelPrice' => $data['fuelPrice'],
//            'fuelQuantity' => $data['fuelQuantity'],
//            'date' => $date
//        ];
//
//        $initialize_field = 'vehicle-daily-data';
//        return  $this->send_post_request($initialize_field, $body);
//
//    }

}

