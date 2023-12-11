<?php

require_once(dirname(__FILE__) . '/../../../Sender/Service/SenderService.php');

class WorksHistorySender extends \Main\SenderService
{

    private static $instance = null;

    function __construct() {
        parent::__construct();
    }

    public static function getInstance(){
        if (self::$instance == null) {
            self::$instance = new WorksHistorySender();
        }

        return self::$instance;
    }


    public function getAllWorksHistory($reportedBy = null,$breakdownCat=null,$breakdownSubcat=null,$partsPay=null,$mehanicPay=null, $limit,$page){
        $initialize_field = 'vehicle-break-down-log' ;
        $filters = array();
        if (!empty($reportedBy)) {
            $filters[] = 'reportedBy=' . urlencode($reportedBy);
        }
        if (!empty($breakdownCat)) {
            $filters[] = 'breakDownCategory=' . (int)$breakdownCat;
        }
        if (!empty($breakdownSubcat)) {
            $filters[] = 'breakDownSubcategory=' . (int) $breakdownSubcat;
        }
        if (!empty($partsPay)) {
            $filters[] = 'partsPayMethod=' . urlencode($partsPay);
        }
        if (!empty($mehanicPay)) {
            $filters[] = 'mechanicPayMethod=' . urlencode($mehanicPay);
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

    public function getCartData($vehicleId = null,$breakDownCategoryId=null){
        $initialize_field = 'vehicle-break-down-log/report/preview?vehicleId='.$vehicleId.'&breakDownCategoryId='.(int)$breakDownCategoryId;
        return  $this->send_get_request($initialize_field);
    }
    public function downloadWorksDataCart($vehicleId = null,$breakDownCategoryId=null){
        $initialize_field = 'vehicle-break-down-log/report/download?vehicleId='.$vehicleId.'&breakDownCategoryId='.(int)$breakDownCategoryId;
        return  $this->send_get_request($initialize_field);
    }

    public function getAllBreakDownCategory(){
        $initialize_field = 'vehicle-break-down-categories' ;
        return  $this->send_get_request($initialize_field);
    }

    public function getSingleDailyData($id) {
        $initialize_field = 'vehicle-daily-data' . '/' . $id;
        return  $this->send_get_request($initialize_field);
    }

    public function updateDailyData($data){
        $body = [
            'startingMileage' => $data['startingMileage'],
            'endingMileage' => $data['endingMileage'],
            'fuelPrice' => $data['fuelPrice'],
            'fuelQuantity' => $data['fuelQuantity']
        ];

        $initialize_field = 'vehicle-daily-data/'.$data['dataId'];
        return  $this->send_put_request($initialize_field, $body);

    }

    public function addNewWorkHistory($data){

        parse_str($data, $data);
        $startingDate = isset($data['startingDate']) ? DateTime::createFromFormat('Y-m-d', $data['startingDate'])->format('d.m.Y') : null;

        $endingDate = isset($data['endingDate']) ? DateTime::createFromFormat('Y-m-d', $data['endingDate'])->format('d.m.Y') : null;

        $body = [
            'reportedBy' => $data['reportedBy'],
            'vehicleId' => $data['vehicleNew'],
            'startingDate' => $startingDate,
            'endingDate' => $endingDate,
            'breakDownCategoryId' => (int)$data['workCategory'],
            'breakDownSubcategoryId' => !empty($data['workSubcategory']) ? (int)$data['workSubcategory'] : null,

            'description' => $data['description'],
            'partsPrice' => $data['partsPrice'],
            'mechanicPrice' => $data['mechanicPrice'],
            'breakDownMileage' => $data['breakDownMileage'],
            'mechanic' => $data['mechanicPaymentMethod'],
            'parts' => $data['vehiclePartsPaymentMethod'],
        ];

        $initialize_field = 'vehicle-break-down-log';
        return  $this->send_post_request($initialize_field, $body);

    }


    public function editWorkHistory($data){

        parse_str($data, $data);
        $startingDate = isset($data['startingDateEdit']) ? DateTime::createFromFormat('Y-m-d', $data['startingDateEdit'])->format('d.m.Y') : null;

        $endingDate = isset($data['endingDateEdit']) ? DateTime::createFromFormat('Y-m-d', $data['endingDateEdit'])->format('d.m.Y') : null;

        $body = [
            'reportedBy' => $data['reportedByEdit'],
            'vehicleId' => $data['vehicleEdit'],
            'startingDate' => $startingDate,
            'endingDate' => $endingDate,
            'breakDownCategoryId' => (int)$data['workCategoryEdit'],
            'breakDownSubcategoryId' => !empty($data['workSubcategoryEdit']) ? (int)$data['workSubcategoryEdit'] : null,


            'description' => $data['descriptionEdit'],
            'partsPrice' => $data['partsPriceEdit'],
            'mechanicPrice' => $data['mechanicPriceEdit'],
            'breakDownMileage' => $data['breakDownMileageEdit'],
            'mechanic' => $data['mechanicPaymentMethodEdit'],
            'parts' => $data['vehiclePartsPaymentMethodEdit'],
        ];

        $initialize_field = 'vehicle-break-down-log/'.$data['workIdEdit'];
        return  $this->send_put_request($initialize_field, $body);

    }

}

