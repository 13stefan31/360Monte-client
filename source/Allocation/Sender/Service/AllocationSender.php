<?php

require_once(dirname(__FILE__) . '/../../../Sender/Service/SenderService.php');

class AllocationSender extends \Main\SenderService
{

    private static $instance = null;

    function __construct() {
        parent::__construct();
    }

    public static function getInstance(){
        if (self::$instance == null) {
            self::$instance = new AllocationSender();
        }

        return self::$instance;
    }

    public function getAllAllocations($vehicle=null,$status=null,$allocationDate=null, $limit,$page){
        $initialize_field = 'allocation' ;

        $filters = array();
        if (!empty($vehicle)) {
            $filters[] = 'vehicle=' . urlencode($vehicle);
        }
        if (!empty($allocationDate)) {
            $filters[] = 'allocationDate=' . urlencode($allocationDate);
        }
        if (!empty($status)) {
            $filters[] = 'status=' . urlencode($status);
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
        $token = $_COOKIE['token'];
        $headers = [
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $token
        ];
        return  $this->send_get_request($initialize_field, $headers);
    }


    public function getSingleAllocation($id) {
        $initialize_field = 'allocation' . '/' . $id;
        $token = $_COOKIE['token'];
        $headers = [
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $token
        ];
        return  $this->send_get_request($initialize_field, $headers);
    }

    public function insertNewAllocation($data){
        $body = [
            'vehicleId' => $data['vehicleId'],
            'allocationDate' => $data['allocationDate']
        ];
        $token = $_COOKIE['token'];
        $headers = [
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $token
        ];
        $initialize_field = 'allocation';

        return  $this->send_post_request($initialize_field, $body,$headers);

    }
    public function deleteAllocation($id){
        $initialize_field = 'allocation/'.$id;
        $token = $_COOKIE['token'];
        $headers = [
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $token
        ];
        return  $this->send_delete_request($initialize_field,$headers);

    }
}

