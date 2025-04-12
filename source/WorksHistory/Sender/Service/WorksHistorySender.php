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


    public function getAllWorksHistory($reportedBy = null,$breakdownCat=null,$vehicleId=null,$date=null,$breakdownSubcat=null,$partsPay=null,$mehanicPay=null,$isWorkFinishedFilter=null, $limit,$page){
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
        if (!empty($vehicleId)) {
            $filters[] = 'vehicleId=' . (int) $vehicleId;
        }
        if (!empty($date)) {
            $filters[] = 'breakDownDate=' . DateTime::createFromFormat('Y-m-d', $date)->format('d.m.Y');
        }
        if (!empty($partsPay)) {
            $filters[] = 'partsPayMethod=' . urlencode($partsPay);
        }
        if (!empty($mehanicPay)) {
            $filters[] = 'mechanicPayMethod=' . urlencode($mehanicPay);
        }
        if ($isWorkFinishedFilter !== null && $isWorkFinishedFilter !== '' && $isWorkFinishedFilter !== false) {
            $filters[] = 'isFinished=' . urlencode($isWorkFinishedFilter);
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
    public function getActiveWorksHistory($id){
        $initialize_field = 'vehicle-break-down-log/active-breakdowns/vehicle/'.$id;
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

    function getSingleWorkData($id)
    {
        $initialize_field = 'vehicle-break-down-log' . '/' . $id;
        return  $this->send_get_request($initialize_field);
    }
    public function getAllBreakDownCategory(){
        $initialize_field = 'vehicle-break-down-categories' ;
        return  $this->send_get_request($initialize_field);
    }


    public function addNewWorkHistory($data){

        parse_str($data, $data);
        $startingDate = isset($data['startingDate']) ? DateTime::createFromFormat('Y-m-d', $data['startingDate'])->format('d.m.Y') : null;

        $endingDate = isset($data['endingDate']) ? DateTime::createFromFormat('Y-m-d', $data['endingDate'])->format('d.m.Y') : null;

        $body = [
            'reportedBy' => $data['reportedBy'],
            'vehicleId' => $data['vehicleNewWorks'],
            'startingDate' => $startingDate,
            'endingDate' => $endingDate,
            'breakDownCategoryId' => (int)$data['workCategory'],
            'breakDownSubcategoryId' => !empty($data['workSubcategory']) ? (int)$data['workSubcategory'] : null,
            'description' => $data['description'],
            'breakDownMileage' => $data['breakDownMileage'],
            'mechanicPaymentMethod' => $data['mechanicPaymentMethod'],
            'partsPaymentMethod' => $data['vehiclePartsPaymentMethod'],
            'partsPriceCache' => $data['partsPriceCache'],
            'partsPriceCard' => $data['partsPriceCard'],
            'mechanicPriceCache' => $data['mechanicPriceCache'],
            'mechanicPriceCard' => $data['mechanicPriceCard'],
        ];

        $initialize_field = 'vehicle-break-down-log';
        return  $this->send_post_request($initialize_field, $body);

    }
    public function deleteWorkData($id) {
        $initialize_field = 'vehicle-break-down-log' . '/' . $id;
        return  $this->send_delete_request($initialize_field);
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
            'breakDownMileage' => $data['breakDownMileageEdit'],

            'partsPriceCard' => $data['partsPriceCardEdit'],
            'partsPaymentMethod' => $data['vehiclePartsPaymentMethodEdit'],
            'partsPriceCache' => $data['partsPriceCacheEdit'],

            'mechanicPaymentMethod' => $data['mechanicPaymentMethodEdit'],
            'mechanicPriceCache' => $data['mechanicPriceCacheEdit'],
            'mechanicPriceCard' => $data['mechanicPriceCardEdit'],
        ];

        $initialize_field = 'vehicle-break-down-log/'.$data['workIdEdit'];
        return  $this->send_put_request($initialize_field, $body);

    }

    public function markAsFinished($workId){
        $initialize_field = 'vehicle-break-down-log/'.$workId.'/mark-as-done';
        return  $this->send_put_request($initialize_field);

    }




}

