<?php

require_once(dirname(__FILE__) . '/../../../Sender/Service/SenderService.php');

class ReportSender extends \Main\SenderService
{

    private static $instance = null;

    function __construct() {
        parent::__construct();
    }

    public static function getInstance(){
        if (self::$instance == null) {
            self::$instance = new ReportSender();
        }

        return self::$instance;
    }


    public function generateReport($data){
        $body = [
            'userId' => $data['userId'],
            'tourId' => $data['tourId'],
            'fromDate' => $data['fromDate'],
            'toDate' => $data['toDate']
        ];
        $initialize_field = 'report/generate-user';
        return  $this->send_post_request($initialize_field, $body);

    }

    public function generateReport2($data){
        $body = [
            'userId' => $data['userId'],
            'fromDate' => $data['fromDate'],
            'toDate' => $data['toDate']
        ];
        $initialize_field = 'report/generate-user-tour-history';
        return  $this->send_post_request($initialize_field, $body);

    }

    public function generateReport3($data){
        $body = [
            'userId' => $data['userId'],
            'vehicleId' => $data['vehicleId'],
            'userComparison' => $data['userComparison'],
            'startingFrom' =>  $data['startingFrom']
        ];
        $initialize_field = 'report/user-fuel-spent-comparison';
        return  $this->send_post_request($initialize_field, $body);

    }

    public function generateReport4($data){

        $initialize_field = 'report/tour-departures-counter';
        $filters = array();
        if (!empty($data['tourId'])) {
            $filters[] = 'tourId=' . urlencode($data['tourId']);
        }
        if (!empty($data['fromDate'])) {
            $filters[] = 'fromDate=' . urlencode($data['fromDate']);
        }
        if (!empty($data['toDate'])) {
            $filters[] = 'toDate=' . urlencode($data['toDate']);
        }
        $filterString = implode('&', $filters);
        if (!empty($filterString)) {
            $initialize_field .= '?' . $filterString;
        }

        return  $this->send_get_request($initialize_field);

    }

}

